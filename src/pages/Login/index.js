import { Form, Input, Message } from '@alifd/next';
import React, { useEffect, useRef, useState } from 'react';
import { request, useHistory } from 'ice';
import { setLocalUser } from '@/util/common';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    fixedSpan: 8,
  },
  wrapperCol: {
    span: 24,
  },
};

export default function Login() {
  const history = useHistory();
  const logining = useRef(false);

  const handleSubmit = (values, errors) => {
    if (errors) {
      return;
    }
    if (logining.current) {
      return;
    }
    logining.current = true;
    console.log('window.gurl', window.gurl);
    request({
      url: window.gurl + '/users/login',
      method: 'post',
      data: `username=${values.username}&password=${values.password}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then((res) => {
        logining.current = false;
        setLocalUser(res);
        history.push('/count');
      })
      .catch((e) => {
        logining.current = false;
        console.log(e);
      });
  };
  return (
    <div>
      <div className="loginbg"></div>
      <div className="login-box">
        <div className="login">
          <div className="loginconter">
            <div className="loginleft"></div>
            <div className="loginright">
              <div className="title">染色体后台管理系统</div>
              <Form className="formbox" size="large" {...formItemLayout} colon>
                <FormItem label="" required requiredMessage="请输入用户名!">
                  <Input name="username" style={{ fontSize: '16px' }} placeholder="请输入用户名" />
                </FormItem>
                <FormItem label="" required requiredMessage="请输入密码!">
                  <Input.Password size="large" name="password" placeholder="请输入密码" />
                </FormItem>
                <FormItem label="" colon={false}>
                  <Form.Submit style={{ width: '100%' }} type="primary" validate onClick={handleSubmit} >
                    登录
                  </Form.Submit>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
