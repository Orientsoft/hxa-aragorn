import React, { useEffect, useState } from 'react';
import { Shell, ConfigProvider, Switch } from '@alifd/next';
import { request, store } from 'ice';
import PageNav from './components/PageNav';
import { asideMenuConfig } from './menuConfig';
import RightHandle from './rightHandle';

(function () {
  const throttle = function (type, name, obj = window) {
    let running = false;

    const func = () => {
      if (running) {
        return;
      }

      running = true;
      requestAnimationFrame(() => {
        obj.dispatchEvent(new CustomEvent(name));
        running = false;
      });
    };

    obj.addEventListener(type, func);
  };

  if (typeof window !== 'undefined') {
    throttle('resize', 'optimizedResize');
  }
})();

export default function BasicLayout({ children }) {
  const [menuconfig, setMenuconfig] = useState(asideMenuConfig);
  const [userState, userDispatchers] = store.useModel('user');
  const [collapse, scollapse] = useState(false);

  const getDevice = (width) => {
    const isPhone = typeof navigator !== 'undefined' && navigator && navigator.userAgent.match(/phone/gi);

    if (width < 680 || isPhone) {
      return 'phone';
    } else if (width < 1280 && width > 680) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  };

  const [device, setDevice] = useState(getDevice(NaN));

  if (typeof window !== 'undefined') {
    window.addEventListener('optimizedResize', (e) => {
      const deviceWidth = (e && e.target && e.target.innerWidth) || NaN;
      setDevice(getDevice(deviceWidth));
    });
  }
  useEffect(() => {
    request({
      url: window.gurl + '/user/me',
    })
      .then((res) => {
        userDispatchers.update({ id: res.id, realname: res.realname });
        if (res.is_admin) {
          const tmp = asideMenuConfig.map((v) => {
            if (v.path === '/admin' || v.path === '/group') {
              return { ...v, show: true };
            }
            return v;
          });
          setMenuconfig(tmp);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const onCollapseChange = (v) => {
    scollapse(v);
  };
  return (
    <div>
      {/* <div style={{ position: 'absolute', bottom: '200px', left: '10px', zIndex: '99999' }}>
        <Switch checked={collapse} onChange={onCollapseChange} size="small" />
      </div> */}
      <ConfigProvider >
        <Shell
          type="brand"
          fixedHeader={false}
        >
          <Shell.Branding className="toptitle">染色体后台管理系统</Shell.Branding>
          <Shell.Navigation
            direction="hoz"
            className="toprightnav"
          >
            <RightHandle />
          </Shell.Navigation>
          <Shell.Action />
          <Shell.Navigation
            collapse={collapse}
            trigger={<img src={collapse ? '../image/toggle-right.png' : '../image/toggle-left.png'} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />}
            onCollapseChange={onCollapseChange}
          >
            <PageNav asideMenuConfig={menuconfig} />
          </Shell.Navigation>

          <Shell.Content style={{ padding: '20px' }}>{children}</Shell.Content>
          <Shell.Footer>{/* <Footer /> */}</Shell.Footer>
        </Shell>
      </ConfigProvider>
    </div>
  );
}
