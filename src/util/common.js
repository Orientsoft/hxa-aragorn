export function getLocalUser() {
  const t = window.localStorage.getItem('u-i');
  if (t) {
    try {
      const p = JSON.parse(t);
      // TODO 设置过期时间检查
      return p;
    } catch (error) {
      return {};
    }
  }
  return {};
}

export function setLocalUser(v) {
  window.localStorage.setItem('u-i', JSON.stringify(v));
}

export function removeUser() {
  window.localStorage.removeItem('u-i');
}
