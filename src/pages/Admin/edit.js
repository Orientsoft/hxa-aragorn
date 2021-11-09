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

export default function Add({ updatePage, disabled }) {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };
  const onShow = () => {
    setVisible(true);
  };
  const handleSubmit = (value, err) => {
    if (err) {
      return;
    }
    request({
      url: window.gurl + '/user',
      method: 'post',
      data: {
        username: value.username,
        is_admin: false,
      },
    })
      .then(() => {
        setVisible(false);
        updatePage();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Button disabled={disabled} type="primary" onClick={onShow}>编辑</Button>
      <Dialog title="编辑" visible={visible} onClose={onClose} footer={false} style={{ width: '300px' }}>
        <Form {...formItemLayout} labelAlign="top">
          <FormItem
            label="姓名:"
            required
            requiredMessage="请填写姓名!"
          >
            <Input name="realname" />
          </FormItem>
          <FormItem label=" " colon={false}>
            <Form.Submit type="primary" validate onClick={handleSubmit} style={{ marginRight: 8 }}>
              提交
            </Form.Submit>
          </FormItem>
        </Form>
      </Dialog>
    </>
  );
}
