import React, { useState } from 'react';
import { Dialog, Button, Form, Input, Select } from '@alifd/next';
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

export default function Add({ handleAdd }) {
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
    handleAdd(value).then(() => {
      setVisible(false);
    });
  };
  return (
    <>
      <Button type="primary" onClick={onShow} style={{ marginBottom: '16px' }}>
        添加分组
      </Button>
      <Dialog title="添加分组" visible={visible} onClose={onClose} footer={false} style={{ width: '300px' }}>
        <Form {...formItemLayout} labelAlign="top">
          <FormItem
            label="选择类型:"
            required
            requiredMessage="请选择类型!"
          >
            <Select style={{ width: '100%' }} name="group_type">
              <Select.Option value="analysis">分析</Select.Option>
              <Select.Option value="count">计数</Select.Option>
            </Select>
          </FormItem>
          <FormItem
            label="分组名称:"
            required
            requiredMessage="请填写分组名称!"
          >
            <Input name="group_name" />
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
