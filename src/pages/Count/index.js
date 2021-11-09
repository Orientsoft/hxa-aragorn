import React, { useEffect, useState, useRef } from 'react';
import { Table, Message } from '@alifd/next';
import EditCell from '@/component/EditCell';
import { request, store } from 'ice';
import AnalysisDetail from './analysisDetail';
import AddDetail from './addDetail';

function CountTable({ tmpData }) {
  console.log('store', store);
  const [userState] = store.useModel('user');
  const addDispatch = store.getModelDispatchers('addData');
  const detailDispatch = store.getModelDispatchers('detailData');

  const [dataSource, setDataSource] = useState([]);

  const onSubmit = (caseid, key, value) => {
    const data = { case_id: caseid };
    if (key === 'remark') {
      data.remark = value;
    } else {
      const [, i] = key.split('b');
      data.count = [];
      const record = tmpData.current.find((v) => v.case_id === caseid);

      for (let j = 0; j < 15; j += 1) {
        data.count[j] = record[`b${j}`] || '';
      }
      data.count[i] = value;
    }
    return request({
      url: window.gurl + '/count',
      method: 'patch',
      data,
    })
      .then(() => {
        Message.success('保存成功');
        if (key === 'remark') { return; }
        const record = tmpData.current.find((v) => v.case_id === caseid);
        const [, i] = key.split('b');
        record[`b${i}`] = value;
        return Promise.resolve();
      })
      .catch((e) => {
        console.log(e);
        return Promise.reject();
      });
  };
  const showAdd = (caseid) => () => {
    const target = tmpData.current.find((v) => v.case_id === caseid);
    if (!target) {
      return;
    }

    const d = target.extra.reduce((a, b, i) => {
      return { ...a, [i]: b || '' };
    }, { case_id: caseid, edit_user: target.edit_user });
    addDispatch.update({ visible: true, data: [d] });

  };
  const showAnalysis = (d) => () => {
    const r = { id: d.id, case_id: d.case_id };
    const ma = d.analysis.find((v) => v.is_main);
    const ca = d.analysis.find((v) => !v.is_main);
    if (ma) {
      r.ma_1 = ma.analysis[0] || '';
      r.ma_2 = ma.analysis[1] || '';
      r.ma_3 = ma.analysis[2] || '';
      r.maxy = ma.karyotype || '';
      r.maman = ma.realname;
      // r.maman = ma.user;
    }
    if (ca) {
      r.ca_1 = ca.analysis[0] || '';
      r.ca_2 = ca.analysis[1] || '';
      r.caxy = ca.karyotype || '';
      r.caman = ma.realname;
      // r.maman = ca.user;
    }
    detailDispatch.update({ visible: true, data: [r] });
  };
  useEffect(() => {
    if (!userState.id) {
      return;
    }
    request({
      url: window.gurl + '/case/list',
      params: {
        page: 1,
        limit: 1000,
      },
    }).then((res) => {
      const d = res.map((v) => {
        const t = {
          case_id: v.case_id,
          id: v.id,
          remark: v.count.remark || '',
          analysis: v.analysis,
          count: v.count.count,
          extra: v.count.extra,
          count_user: v.count.user,
          edit_user: v.count.user,
        };
        v.count.count.forEach((va, i) => {
          t[`b${i}`] = va || '';
        });
        return t;
      });
      tmpData.current = d;
      setDataSource(d);
    })
      .catch((e) => {
        console.log(e);
      });
  }, [userState.id]);
  let maxHeight = document.body.clientHeight - 180;
  if (document.body.clientHeight < 900) {
    maxHeight = 450;
  }
  console.log('maxHeight', maxHeight);
  return (
    <Table
      dataSource={dataSource}
      emptyContent=""
      // fixedHeader
      // maxBodyHeight={maxHeight}
    >
      <Table.Column title="编号" dataIndex="case_id" width={120} align="center" cell={(v) => <div style={{ width: '120px' }}>{v}</div>} />
      <Table.Column title="1" dataIndex="b0" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b0" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="2" dataIndex="b1" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b1" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="3" dataIndex="b2" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b2" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="4" dataIndex="b3" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b3" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="5" dataIndex="b4" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b4" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="6" dataIndex="b5" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b5" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="7" dataIndex="b6" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b6" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="8" dataIndex="b7" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b7" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="9" dataIndex="b8" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b8" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="10" dataIndex="b9" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b9" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="11" dataIndex="b10" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b10" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="12" dataIndex="b11" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b11" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="13" dataIndex="b12" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b12" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="14" dataIndex="b13" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b13" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="15" dataIndex="b14" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="b14" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="备注" dataIndex="remark" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="remark" onSubmit={onSubmit} />} align="center" />
      <Table.Column title="加数" dataIndex="add" align="center" cell={(v, index, record) => <span className="canclick" onClick={showAdd(record.case_id)}>详情</span>} />
      <Table.Column title="分析" dataIndex="analysis" align="center" cell={(v, index, record) => <span className="canclick" onClick={showAnalysis(record)}>详情</span>} />
    </Table>
  );
}
const CountTableMemo = React.memo(CountTable);
const Count = () => {
  const tmpData = useRef([]);
  return (
    <div className="clear-table-padding tablebd">
      <CountTableMemo tmpData={tmpData} />
      <AnalysisDetail />
      <AddDetail tmpData={tmpData} />
    </div>
  );
};

export default Count;
