import React, { useEffect, useState } from 'react';
import { Table, Button, Dialog, Message } from '@alifd/next';
import { request, useHistory } from 'ice';
import Add from './add';
import Edit from './edit';

const isAdmin = (v) => {
  return v ? '管理员' : '普通用户';
};
export default function Admin() {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    request({
      url: window.gurl + '/user_list',
      params: {
        page: 1,
        limit: 1000,
      },
    })
      .then((res) => {
        setDataSource(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const popupConfirm = (uid) => () => {
    Dialog.confirm({
      title: '删除用户',
      content: '确认删除此用户吗?',
      onOk: () => {
        return request({
          url: window.gurl +  '/user',
          method: 'delete',
          params: {
            user_id: uid,
          },
        })
          .then(() => {
            const t = dataSource.filter((v) => v.id !== uid);
            setDataSource(t);
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });
  };
  const handleSubmit = (value) => {
    return request({
      url: window.gurl +  '/user',
      method: 'post',
      data: {
        username: value.username,
        realname: value.realname,
        is_admin: false,
        password: value.password,
      },
    })
      .then((res) => {
        Message.success('添加成功');
        const t = dataSource.map((v) => ({ ...v }));
        t.push({
          username: value.username,
          realname: value.realname,
          is_admin: false,
          password: value.username,
          id: res.data.id,
        });
        setDataSource(t);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handle = (v, i, r) => {
    const disabled = r.is_admin;
    return (
      <div>
        {/* <Edit disabled={disabled} /> */}
        <Button disabled={disabled} type="primary" warning style={{ marginLeft: '8px' }} onClick={popupConfirm(r.id)}>删除</Button>
      </div>
    );
  };
  return (
    <div >
      <Add handleSubmit={handleSubmit} />
      <Table dataSource={dataSource}>
        <Table.Column title="用户名" dataIndex="username" align="center" />
        <Table.Column title="姓名" dataIndex="realname" align="center" />
        <Table.Column title="用户类型" dataIndex="is_admin" align="center" cell={isAdmin} />
        <Table.Column width="100px" title="操作" dataIndex="handle" align="center" cell={handle} />
      </Table>
    </div>
  );
}
