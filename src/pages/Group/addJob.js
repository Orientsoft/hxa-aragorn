import React, { useRef, useState } from 'react';
import { Dialog, Button, Form, Select, NumberPicker } from '@alifd/next';
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
  const [dataSource, setDataSource] = useState([]);
  const searchTimeout = useRef();
  const onClose = () => {
    setVisible(false);
  };
  const onShow = () => {
    setVisible(true);
  };
  const submit = (value, err) => {
    if (err) {
      return;
    }
    const p = dataSource.find((v) => v.value === value.user_id);
    handleSubmit({ ...value, realname: p.label })
      .then(() => {
        setVisible(false);
      }).catch((e) => {
        console.log(e);
      });
  };
  const handleSearch = (value) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    request({
      url: window.gurl + '/user_list',
      params: {
        page: 1,
        limit: 10,
        search: value,
      },
    }).then((res) => {
      searchTimeout.current = null;
      const tmp = res.data.map((v) => ({ label: v.realname, value: v.id }));
      setDataSource(tmp);
    })
      .catch(() => {
        searchTimeout.current = null;
      });
  };
  return (
    <>
      <Button type="primary" onClick={onShow} style={{ marginBottom: '16px' }}>
        添加人员
      </Button>
      <Dialog title="添加人员" visible={visible} onClose={onClose} footer={false} style={{ width: '300px' }}>
        <Form {...formItemLayout} labelAlign="top">
          <FormItem
            label="选择人员:"
            required
            requiredMessage="请选择人员!"
          >
            <Select
              style={{ width: '100%' }}
              name="user_id"
              showSearch
              placeholder="搜索姓名"
              filterLocal={false}
              dataSource={dataSource}
              onSearch={handleSearch}
            />
          </FormItem>
          <FormItem
            label="工作量:"
            required
            requiredMessage="请输入工作量!"
          >
            <NumberPicker style={{ width: '100%' }} min={0} name="quantities" />
          </FormItem>
          <FormItem
            label="选择分工:"
            required
            requiredMessage="请选择照片质量!"
          >
            <Select style={{ width: '100%' }} name="case_type">
              <Select.Option value="G">高清</Select.Option>
              <Select.Option value="L">低清</Select.Option>
            </Select>
          </FormItem>
          <FormItem label=" " colon={false}>
            <Form.Submit type="primary" validate onClick={submit} style={{ marginRight: 8 }}>
              提交
            </Form.Submit>
          </FormItem>
        </Form>
      </Dialog>
    </>
  );
}
