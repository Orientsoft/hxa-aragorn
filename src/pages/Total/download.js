import React, { useState } from 'react';
import { Dialog, Button, Form, Input, Table, Message } from '@alifd/next';
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

function check(start, end) {
  if (start.length !== end.length) {
    return '两次编号长度不一致';
  }
  const s1 = start[0];
  const e1 = end[0];
  if (s1 !== 'L' && s1 !== 'G') {
    return '请填写正确的开始编号';
  }
  if (e1 !== 'L' && e1 !== 'G') {
    return '请填写正确的结束编号';
  }
  if (s1 !== e1) {
    return '请填写同系列编号';
  }
  const s2 = Number(start.slice(1, start.length));
  const e2 = Number(end.slice(1, start.length));
  if (isNaN(s2)) {
    return '请填写正确的开始编号';
  }
  if (isNaN(e2)) {
    return '请填写正确的结束编号';
  }
  if (s2 >= e2) {
    return '结束编号需大于开始编号';
  }
  const ids = [];
  for (let i = s2; i <= e2; i += 1) {
    ids.push(`${s1}${i}`);
  }
  return ids;
}

export default function Add() {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [file, setFile] = useState('');

  const onClose = () => {
    setVisible(false);
  };
  const onShow = () => {
    setVisible(true);
  };
  const ondownload = (event) => {
    event.preventDefault();
    request({
      url: window.gurl + '/case/export',
      params: {
        filename: file,
      },
      responseType: 'arraybuffer',
    })
      .then((res) => {
        const tmp = new Blob([res]);
        const reader = new FileReader();
        reader.onload = function (evt) {
          const a = document.createElement('a');
          //   a.download = `${title}代码及排名.zip`;
          a.download = file;
          a.href = evt.target.result;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        };
        reader.readAsDataURL(tmp);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const handleSubmit = (value, err) => {
    console.log(value, err);
    if (err) {
      return;
    }
    const ret = check(value.start, value.end);
    if (typeof ret === 'string') {
      return Message.error(ret);
    }
    request({
      url: window.gurl + '/case/export',
      method: 'post',
      data: {
        case_list: ret,
      },
    })
      .then((res) => {
        setFile(res.file);
        setDataSource(res.error);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Button type="primary" onClick={onShow}>
        下载
      </Button>
      <Dialog title="下载" visible={visible} onClose={onClose} footer={false} style={{ width: '600px' }} height="500px">
        <Form inline {...formItemLayout} labelAlign="top">
          <FormItem label="开始编号:" required requiredMessage="请填写开始编号!">
            <Input name="start" />
          </FormItem>
          <FormItem label="结束编号:" required requiredMessage="请填写结束编号!">
            <Input name="end" />
          </FormItem>
          <FormItem label="&nbsp;" colon={false}>
            <Form.Submit size="small" type="primary" validate onClick={handleSubmit} style={{ marginRight: 8 }}>
              生成下载链接
            </Form.Submit>
          </FormItem>
        </Form>
        <div>
          <div style={{ margin: '8px' }}>
            {dataSource.length > 0 && (
              <span style={{ display: 'inline-block', marginRight: '16px' }}>
                当前有<span style={{ color: 'red' }}>{dataSource.length}</span>处不符合规定。
              </span>
            )}
            {file && (
              <span>
                包含合格数据文件已生成<a href="" onClick={ondownload}>点击下载</a>
              </span>
            )}
          </div>
          {dataSource.length > 0 && (
            <Table dataSource={dataSource} emptyContent="" maxBodyHeight={200} size="small">
              <Table.Column title="编号" dataIndex="case_id" width={200} align="center" />
              <Table.Column title="原因" dataIndex="error" align="center" />
            </Table>
          )}
        </div>
      </Dialog>
    </>
  );
}
