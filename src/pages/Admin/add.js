import React, { useState } from 'react';
import { Dialog, Button, Form, Input } from '@alifd/next';
import { request } from 'ice';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    fixedSpan: 8,
  },
  wrapperCol: {
    span: 14,
  },
};

export default function Add({ handleSubmit }) {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const onShow = () => {
    setVisible(true);
  };
  const sumit = (value, err) => {
    if (err) {
      return;
    }
    handleSubmit(value).then(() => {
      setVisible(false);
    }).catch(() => {
      setVisible(false);
    });
  };
  return (
    <>
      <Button type="primary" onClick={onShow} style={{ marginBottom: '16px' }}>
        添加
      </Button>
      <Dialog title="添加" visible={visible} onClose={onClose} footer={false} style={{ width: '300px' }}>
        <Form {...formItemLayout} labelAlign="top">
          <FormItem
            label="用户名:"
            required
            requiredMessage="请填写用户名!"

          >
            <Input name="username" />
          </FormItem>
          <FormItem
            label="密码:"
            required
            requiredMessage="请填写密码!"
          >
            <Input name="password" />
          </FormItem>
          <FormItem
            label="姓名:"
            required
            requiredMessage="请填写姓名!"
          >
            <Input name="realname" />
          </FormItem>
          <FormItem label=" " colon={false}>
            <Form.Submit type="primary" validate onClick={sumit} style={{ marginRight: 8 }}>
              提交
            </Form.Submit>
          </FormItem>
        </Form>
      </Dialog>
    </>
  );
}
