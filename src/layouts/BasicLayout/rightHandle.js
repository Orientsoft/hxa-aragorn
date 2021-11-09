import React, { useState } from 'react';
import { Dropdown, Menu, Dialog, Button, Form, Input, Message } from '@alifd/next';
import { request, useHistory, store } from 'ice';
import { removeUser } from '@/util/common';


export default function RightHandle() {
  const [userState, userDispatchers] = store.useModel('user');
  const [v, sv] = useState(false);
  const [v1, sv1] = useState(false);
  const history = useHistory();

  const onEditPassword = () => {
    sv1(true);
  };
  const onEdit = () => {
    sv(true);
  };
  const onLogout = () => {
    removeUser();
    history.push('/login');
  };
  const menu = (
    <Menu>
      <Menu.Item onClick={onEdit}>个人信息</Menu.Item>
      <Menu.Item onClick={onEditPassword}>修改密码</Menu.Item>
      <Menu.Item onClick={onLogout}>退出</Menu.Item>
    </Menu>
  );
  const onClose = () => {
    sv(false);
  };
  const onClose1 = () => {
    sv1(false);
  };
  const handleSubmit = (value, err) => {
    if (err) {
      return;
    }
    request({
      url: window.gurl + '/user',
      method: 'patch',
      params: { realname: value.realname },
    })
      .then((res) => {
        Message.success('保存成功');
        userDispatchers.update({ id: userState.id, realname: value.realname });
      })
      .catch((e) => {});
  };
  const handleSubmitPassword = (value, err) => {
    if (err) {
      return;
    }
    if (value.new_password !== value.confirm_password) {
      Message.error('两次密码不一致');
    }
    request({
      url: window.gurl + '/user/password',
      method: 'patch',
      params: { old_password: value.old_password, new_password: value.new_password },
    })
      .then((res) => {
        Message.success('保存成功');
      })
      .catch((e) => {});
  };
  return (
    <>
      <Dropdown
        trigger={
          <Button text style={{ color: '#fff' }}>
            {userState.realname}
          </Button>
        }
        triggerType={['click']}
      >
        {menu}
      </Dropdown>
      <Dialog
        height="300px"
        title="个人信息"
        visible={v}
        onOk={onClose}
        onCancel={onClose}
        onClose={onClose}
        footer={false}
        style={{ width: '400px' }}
      >
        <Form labelAlign="top" size="large" value={{ realname: userState.realname }} fullWidth>
          <Form.Item label="姓名:" required requiredMessage="请填写姓名">
            <Input placeholder="姓名" name="realname" />
          </Form.Item>
          <Form.Item label=" ">
            <Form.Submit type="primary" onClick={handleSubmit}>
              保存
            </Form.Submit>
          </Form.Item>
        </Form>
      </Dialog>
      <Dialog
        height="500px"
        title="修改密码"
        visible={v1}
        onOk={onClose1}
        onCancel={onClose1}
        onClose={onClose1}
        footer={false}
        style={{ width: '400px' }}
      >
        <Form labelAlign="top" size="large" value={{ realname: userState.realname }} fullWidth>
          <Form.Item label="旧密码:" required requiredMessage="请填写旧密码">
            <Input.Password placeholder="旧密码" name="old_password" />
          </Form.Item>
          <Form.Item label="新密码:" required requiredMessage="请填写新密码">
            <Input.Password placeholder="新密码" name="new_password" />
          </Form.Item>
          <Form.Item label="确认密码:" required requiredMessage="请填写确认密码">
            <Input.Password placeholder="确认密码" name="confirm_password" />
          </Form.Item>
          <Form.Item label=" ">
            <Form.Submit type="primary" onClick={handleSubmitPassword}>
              保存
            </Form.Submit>
          </Form.Item>
        </Form>
      </Dialog>
    </>
  );
}
