import React, { useEffect, useState, useRef } from 'react';
import { Grid, Tree, Button, Select, Table, Card, Icon, Dialog } from '@alifd/next';
import { request } from 'ice';
import Add from './add';
import AddJob from './addJob';
import EditName from './editName';
//
const { Row, Col } = Grid;
const caseCfg = {
  G: '高清',
  L: '低清',
};

function getDefault() {
  return [
    {
      label: '分析',
      key: 'analysis',
      children: [],
      icon: <img src={'../image/form.png'} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />,
      type: 'analysis',
      editable: false,
    },
    {
      label: '计数',
      key: 'count',
      children: [],
      icon: <img src={'../image/chart-bar.png'} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />,
      type: 'count',
      editable: false,
    },
  ];
}
export default function Group() {
  const [data, setData] = useState(getDefault());
  const [select, setSelect] = useState({});
  const tmp = useRef([]);

  const onSelect = (v) => {
    if (v[0] === 'analysis' || v[0] === 'count') {
      return;
    }
    if (!v[0]) {
      return;
    }
    const group = tmp.current.find((t) => t.id === v[0]);
    if (group) {
      setSelect(group);
    }
  };
  const onCheck = () => {};
  const onEditFinish = () => {};

  const popupConfirm = (uid) => () => {
    Dialog.confirm({
      title: '删除用户',
      content: '确认删除此用户吗?',
      onOk: () => {
        return request({
          url: window.gurl + '/division',
          method: 'delete',
          params: {
            division_id: uid,
          },
        })
          .then(() => {
            const group = tmp.current.find((t) => t.id === select.id);
            const division = group.division.filter((v) => v.id !== uid);
            setSelect(
              {
                ...select,
                division,
              },
            );
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });
  };
  const delelteGroup = () => {
    Dialog.confirm({
      title: '删除分组',
      content: '确认删除此分组吗?',
      onOk: () => {
        return request({
          url: window.gurl + '/group',
          method: 'delete',
          params: {
            group_id: select.id,
          },
        })
          .then(() => {
            const res = tmp.current.filter((v) => v.id !== select.id);
            tmp.current = res;
            const analysis = res.filter((v) => v.group_type === 'analysis').map((v) => ({ ...v, label: v.group_name, key: v.id }));
            const count = res.filter((v) => v.group_type === 'count').map((v) => ({ ...v, label: v.group_name, key: v.id }));
            const t = getDefault();
            t[0].children = analysis;
            t[1].children = count;
            setData(t);
            if (analysis.length) {
              setSelect(analysis[0]);
            } else if (count.length) {
              setSelect(count[0]);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      },
    });
  };
  const renderHandle = (v, i, r) => {
    return <div><Button type="primary" warning style={{ marginLeft: '8px' }} onClick={popupConfirm(r.id)}>删除</Button></div>;
  };
  const handleAdd = (value) => {
    return request({
      url: window.gurl + '/group',
      method: 'post',
      data: value,
    }).then((res) => {
      const newItem = {
        id: res.data.group_id,
        group_name: value.group_name,
        group_type: value.group_type,
        division: [],
        label: value.group_name,
        key: res.data.group_id,
      };
      tmp.current.push(newItem);
      if (value.group_type === 'analysis') {
        const analysis = data[0].children.map((v) => ({ ...v }));
        analysis.push(newItem);
        const t = getDefault();
        t[0].children = analysis;
        t[1].children = data[1].children;
        setData(t);
      } else {
        const count = data[1].children.map((v) => ({ ...v }));
        count.push(newItem);
        const t = getDefault();
        t[0].children = data[0].children;
        t[1].children = count;
        setData(t);
      }
    })
      .catch(() => {

      });
  };
  const handleSubmit = (v) => {
    return request({
      url: window.gurl + '/division',
      method: 'post',
      data: {
        group_id: select.id,
        ...v,
      },
    })
      .then((res) => {
        const group = tmp.current.find((t) => t.id === select.id);
        const t = select.division.map((tv) => ({ ...tv }));
        t.push({ id: res.data.division_id, ...v });
        group.division = t;

        setSelect({
          ...select,
          division: t,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handelSave = (value) => {
    return request({
      url: window.gurl + '/group',
      method: 'patch',
      data: {
        group_id: select.id,
        group_name: value,
      },
    }).then(() => {
      const target = tmp.current.find((v) => v.id === select.id);
      target.group_name = value;
      if (target.group_type === 'analysis') {
        const analysis = data[0].children.map((v) => {
          return v.key === select.id ? { ...v, group_name: value, label: value } : v;
        });
        const t = getDefault();
        t[0].children = analysis;
        t[1].children = data[1].children;
        setData(t);
      } else {
        const count = data[1].children.map((v) => {
          return v.key === select.id ? { ...v, group_name: value, label: value } : v;
        });
        const t = getDefault();
        t[0].children = data[0].children;
        t[1].children = count;
        setData(t);
      }
      setSelect({
        ...select,
        group_name: value,
      });
    }).catch((e) => {
      console.log(e);
    });
  };
  useEffect(() => {
    request({
      url: window.gurl + '/group',
      params: {
        page: 1,
        limit: 1000,
      },
    })
      .then((res) => {
        tmp.current = res;
        const analysis = res.filter((v) => v.group_type === 'analysis').map((v) => ({ ...v, label: v.group_name, key: v.id }));
        const count = res.filter((v) => v.group_type === 'count').map((v) => ({ ...v, label: v.group_name, key: v.id }));
        const t = getDefault();
        t[0].children = analysis;
        t[1].children = count;
        setData(t);
        if (analysis.length) {
          setSelect(analysis[0]);
        } else if (count.length) {
          setSelect(count[0]);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div >
      <Row>
        <Col xs={6} s={6} m={6} className="bgleft">
          <div>
            <Add handleAdd={handleAdd} />
          </div>
          <Tree
            onSelect={onSelect}
            onCheck={onCheck}
            onEditFinish={onEditFinish}
            selectedKeys={[select.id]}
            defaultExpandedKeys={['analysis', 'count']}
            dataSource={data}
          />
        </Col>
        <Col>
          <div>
            {select.id && (
              <Card free>
                <Card.Header title={<EditName name={select.group_name} handelSave={handelSave} />} extra={<Button type="primary" warning style={{ marginLeft: '8px' }} onClick={delelteGroup}>删除分组</Button>} />
                <Card.Divider />
                <Card.Content>
                  <div > <AddJob handleSubmit={handleSubmit} /></div>
                  <Table dataSource={select.division} emptyContent="" >
                    <Table.Column title="姓名" dataIndex="realname" align="center" />
                    <Table.Column title="照片质量" dataIndex="case_type" align="center" cell={(v) => caseCfg[v]} />
                    <Table.Column title="工作量" dataIndex="quantities" align="center" />
                    <Table.Column title="操作" dataIndex="b4" align="center" width={100} cell={renderHandle} />
                  </Table>
                </Card.Content>
              </Card>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
}
