import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Table, Dialog, Message } from '@alifd/next';
import { request, store } from 'ice';
import EditCell from '@/component/EditCell';

const checkKey = ['ma_1', 'ma_2', 'ma_3', 'ca_1', 'ca_2', 'ca_3'];

const Analysis = () => {
  const [userState] = store.useModel('user');
  const [dataSource, setDataSource] = useState([]);
  const tmpdata = useRef([]);
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState([]);
  const onClose = () => {
    setVisible(false);
  };

  const showCount = (v) => () => {
    setVisible(true);
    const d = { case_id: v.case_id };
    v.count.count.forEach((va, i) => {
      d[`b${i}`] = va;
    });
    v.count.extra.forEach((va, i) => {
      d[`a${i}`] = va;
    });
    setDetail([d]);
  };
  const onSubmit = (caseid, key, value) => {
    const data = { case_id: caseid };
    if (key === 'maxy' || key === 'caxy') {
      data.karyotype = value;
    } else {
      const [k, index] = key.split('_');
      const record = tmpdata.current.find((v) => v.case_id === caseid);
      // 检查分析数据是否重复
      for (let i = 0; i < checkKey.length; i += 1) {
        const s1 = value ? value.trim() : '';
        const s2 = record[checkKey[i]] ? record[checkKey[i]].trim() : '';
        console.log('s1s2:', s1, s2);
        if (s1 === s2 && key !== checkKey[i]) {
          Message.error('数据重复');
          return Promise.reject();
        }
      }

      if (k === 'ma') {
        data.analysis = [record.ma_1, record.ma_2, record.ma_3];
        data.analysis[index - 1] = value;
      } else {
        data.analysis = [record.ca_1, record.ca_2];
        data.analysis[index - 1] = value;
      }
    }
    return request({
      url: window.gurl + '/analysis',
      method: 'patch',
      data,
    })
      .then(() => {
        Message.success('保存成功');
        const record = tmpdata.current.find((v) => v.case_id === caseid);
        if (key === 'maxy' || key === 'caxy') {
          record[key] = value;
          setDataSource([...tmpdata.current]);
          return Promise.resolve();
        }
        const [k, index] = key.split('_');
        if (k === 'ma') {
          record[`ma_${index}`] = value;
        } else {
          record[`ca_${index}`] = value;
        }
        return Promise.resolve();
      })
      .catch((e) => {
        console.log(e);
        return Promise.reject();
      });
  };
  useEffect(() => {
    request({
      url: window.gurl + '/case/list',
      params: {
        page: 1,
        limit: 1000,
      },
    })
      .then((res) => {
        const data = res.map((d) => {
          const r = {
            id: d.id,
            case_id: d.case_id,
            work: d.work,
            count: d.count,
            ma_1: '',
            ma_2: '',
            ma_3: '',
            maxy: '',
            maman: '',
            m_edit_user: '',
            ca_1: '',
            ca_2: '',
            caxy: '',
            caman: '',
            c_edit_user: '',
          };
          const ma = d.analysis.find((v) => v.is_main);
          const ca = d.analysis.find((v) => !v.is_main);
          if (ma) {
            r.ma_1 = ma.analysis[0] || '';
            r.ma_2 = ma.analysis[1] || '';
            r.ma_3 = ma.analysis[2] || '';
            r.maxy = ma.karyotype || '';
            r.maman = ma.realname;
            r.m_edit_user = ma.user;
            // r.maman = ma.user;
          }

          if (ca) {
            r.ca_1 = ca.analysis[0] || '';
            r.ca_2 = ca.analysis[1] || '';
            r.caxy = ca.karyotype || '';
            r.caman = ca.realname;
            r.c_edit_user = ca.user;
            // r.maman = ca.user;
          }
          return r;
        });
        tmpdata.current = data;
        setDataSource(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  let maxHeight = document.body.clientHeight - 180;
  if (document.body.clientHeight < 900) {
    maxHeight = 450;
  }
  return (
    <div className="clear-table-padding tablebd">
      <Table
        dataSource={dataSource}
       // style={{ width: '1250px', margin: '0 auto' }}
        // fixedHeader
        // maxBodyHeight={maxHeight}
      >
        <Table.Column title="编号" dataIndex="case_id" align="center" width={120} cell={(v) => <div style={{ width: '120px' }}>{v}</div>} />
        <Table.ColumnGroup title="主分析" align="center">
          <Table.Column width={90} title="分析1" dataIndex="ma_1" cell={<EditCell userid={userState.id} work="MA" dataIndex="ma_1" onSubmit={onSubmit} />} align="center" />
          <Table.Column width={90} title="分析2" dataIndex="ma_2" align="center" cell={<EditCell userid={userState.id} work="MA" dataIndex="ma_2" onSubmit={onSubmit} />} />
          <Table.Column width={90} title="分析3" dataIndex="ma_3" align="center" cell={<EditCell userid={userState.id} work="MA" dataIndex="ma_3" onSubmit={onSubmit} />} />
          <Table.Column width={90} title="核型" dataIndex="maxy" align="center" cell={<EditCell userid={userState.id} check work="MA" dataIndex="maxy" width="220px" onSubmit={onSubmit} />} />
          <Table.Column width={120} title="分析师" dataIndex="maman" align="center" cell={(v) => <div style={{ width: '100px' }}>{v}</div>} />
        </Table.ColumnGroup>
        <Table.ColumnGroup title="辅分析" align="center">
          <Table.Column width={90} title="辅分析1" dataIndex="ca_1" cell={<EditCell userid={userState.id} work="SA" dataIndex="ca_1" onSubmit={onSubmit} />} align="center" />
          <Table.Column width={90} title="辅分析2" dataIndex="ca_2" align="center" cell={<EditCell userid={userState.id} work="SA" dataIndex="ca_2" onSubmit={onSubmit} />} />
          <Table.Column width={90} title="核型" dataIndex="caxy" align="center" cell={<EditCell userid={userState.id} check work="SA" dataIndex="caxy" onSubmit={onSubmit} width="220px" />} />
          <Table.Column width={120} title="分析师" dataIndex="caman" align="center" cell={(v) => <div style={{ width: '100px' }}>{v}</div>} />
        </Table.ColumnGroup>
        <Table.Column width={90} title="计数" dataIndex="a9" align="center" cell={(v, index, record) => <span className="canclick" onClick={showCount(record)}>详情</span>} />
      </Table>
      <Dialog title="计数详情" visible={visible} onClose={onClose} footer={false}>
        <div className="mb10">
          <Table dataSource={detail} emptyContent="" >
            <Table.Column title="编号" dataIndex="case_id" align="center" />
            <Table.Column title="1" dataIndex="b0" align="center" />
            <Table.Column title="2" dataIndex="b1" align="center" />
            <Table.Column title="3" dataIndex="b2" align="center" />
            <Table.Column title="4" dataIndex="b3" align="center" />
            <Table.Column title="5" dataIndex="b4" align="center" />
            <Table.Column title="6" dataIndex="b5" align="center" />
            <Table.Column title="7" dataIndex="b6" align="center" />
            <Table.Column title="8" dataIndex="b7" align="center" />
            <Table.Column title="9" dataIndex="b8" align="center" />
            <Table.Column title="10" dataIndex="b9" align="center" />
            <Table.Column title="11" dataIndex="b10" align="center" />
            <Table.Column title="12" dataIndex="b11" align="center" />
            <Table.Column title="13" dataIndex="b12" align="center" />
            <Table.Column title="14" dataIndex="b13" align="center" />
            <Table.Column title="15" dataIndex="b14" align="center" />
            {/* <Table.Column title="备注" dataIndex="remark" align="center" /> */}
          </Table>
        </div>
        <div className="mb10">
          <Table dataSource={detail} emptyContent="" >
            <Table.Column title="编号" dataIndex="case_id" align="center" />
            <Table.Column title="加数1" dataIndex="a0" align="center" />
            <Table.Column title="加数2" dataIndex="a1" align="center" />
            <Table.Column title="加数3" dataIndex="a2" align="center" />
            <Table.Column title="加数4" dataIndex="a3" align="center" />
            <Table.Column title="加数5" dataIndex="a4" align="center" />
            <Table.Column title="加数6" dataIndex="a5" align="center" />
            <Table.Column title="加数7" dataIndex="a6" align="center" />
            <Table.Column title="加数8" dataIndex="a7" align="center" />
            <Table.Column title="加数9" dataIndex="a8" align="center" />
            <Table.Column title="加数10" dataIndex="a9" align="center" />
          </Table>
        </div>
        <div className="mb10">
          <Table dataSource={detail} emptyContent="" >
            <Table.Column title="编号" dataIndex="case_id" align="center" />
            <Table.Column title="加数11" dataIndex="a10" align="center" />
            <Table.Column title="加数12" dataIndex="a11" align="center" />
            <Table.Column title="加数13" dataIndex="a12" align="center" />
            <Table.Column title="加数14" dataIndex="a13" align="center" />
            <Table.Column title="加数15" dataIndex="a14" align="center" />
            <Table.Column title="加数16" dataIndex="a15" align="center" />
            <Table.Column title="加数17" dataIndex="a16" align="center" />
            <Table.Column title="加数18" dataIndex="a17" align="center" />
            <Table.Column title="加数19" dataIndex="a18" align="center" />
            <Table.Column title="加数20" dataIndex="a19" align="center" />
          </Table>
        </div>
        <div className="mb10">
          <Table dataSource={detail} emptyContent="" >
            <Table.Column title="编号" dataIndex="case_id" align="center" />
            <Table.Column title="加数21" dataIndex="a20" align="center" />
            <Table.Column title="加数22" dataIndex="a21" align="center" />
            <Table.Column title="加数23" dataIndex="a22" align="center" />
            <Table.Column title="加数24" dataIndex="a23" align="center" />
            <Table.Column title="加数25" dataIndex="a24" align="center" />
            <Table.Column title="加数26" dataIndex="a25" align="center" />
            <Table.Column title="加数27" dataIndex="a26" align="center" />
            <Table.Column title="加数28" dataIndex="a27" align="center" />
            <Table.Column title="加数29" dataIndex="a28" align="center" />
            <Table.Column title="加数30" dataIndex="a29" align="center" />
          </Table>
        </div>
      </Dialog>
    </div>
  );
};

export default Analysis;
