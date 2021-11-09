export default {
  // 定义 model 的初始 state
  state: {
    visible: false,
    data: [],
  },

  // 定义改变该模型状态的纯函数
  reducers: {
    update(prevState, payload) {
      return payload;
    },
  },
};
