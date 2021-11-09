import { runApp, history } from 'ice';
import { Message } from '@alifd/next';

import { getLocalUser, removeUser } from '@/util/common';

// window.gurl = 'http://139.155.10.14:8000/api';
window.gurl = 'http://192.168.0.84:8000/api';

const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  request: {
    baseURL: '/api',
    interceptors: {
      request: {
        onConfig: (config) => {
          const localUser = getLocalUser();
          console.log('config.url', config);
          if (localUser.access_token && config.url !== window.gurl + '/users/login') {
            config.headers.Authorization = `Bearer ${localUser.access_token}`;
          }
          return config;
        },
      },
      response: {
        // onConfig: (response) => {
        //   // 请求成功：可以做全局的 toast 展示，或者对 response 做一些格式化

        //   return response;
        // },
        onError: (error) => {
          if (!error.response) {
            return Promise.reject(error.response);
          }
          if (error.response.status === 401 || error.response.status === 403) {
            Message.error('授权已过期', 1.5);
            setTimeout(() => {
              removeUser();
              history.push('/login');
            }, 3000);
            return Promise.reject(error.response.data);
          }
          if (error.response.status >= 500) {
            console.log('error.response', error.response);
            Message.error('server error:' + error.response.status);
            return Promise.reject(error.response.data);
          }
          if (error.response.data.errors) {
            Message.error(error.response.data.errors[0].msg);
          } else {
            Message.error(error.response.data);
          }
          return Promise.reject(error.response.data);
        },
      },
    },
  },
};
runApp(appConfig);
