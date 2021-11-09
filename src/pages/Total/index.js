import React, { useEffect, useState } from 'react';
import { Table, Pagination, Dialog } from '@alifd/next';
import Download from './download';
import { request } from 'ice';

const pageSize = 10;
export default function Total() {
  const [page, setPage] = useState(1);
  const [total, settotal] = useState(0);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [detail, setDetail] = useState([]);

  const change = (p) => {
    setPage(p);
  };
  const onClose = () => {
    setVisible(false);
    setDetail([]);
  };
  const showDetail = (v, id) => () => {
    const d = { case_id: id };
    v.forEach((t, i) => {
      d[i] = t;
    });
    setVisible(true);
    setDetail([d]);
  };
  const renderCell = (v, i, r) => {
    if (v.length) {
      return <span className="canclick" onClick={showDetail(v, r.case_id)}>详情</span>;
    }
    return '无';
  };
  useEffect(() => {
    request({
      url: window.gurl + '/case/total',
      params: {
        finished: false,
        page,
        limit: pageSize,
      },
    })
      .then((res) => {
        const d = res.data.map((v) => {
          const t = { case_id: v.case_id, id: v.id };
          v.analysis.forEach((e) => {
            if (e.is_main) {
              t.maxy = e.karyotype || '';
              t.maman = e.realname;
              t.ma_1 = e.analysis[0] || '';
              t.ma_2 = e.analysis[1] || '';
              t.ma_3 = e.analysis[2] || '';
            } else {
              t.caxy = e.karyotype || '';
              t.caman = e.realname;
              t.ca_1 = e.analysis[0] || '';
              t.ca_2 = e.analysis[1] || '';
            }
          });
          for (let i = 0; i < 15; i += 1) {
            t[`b${i}`] = v.count.count[i] || '';
          }
          t.remark = v.count.remark;
          t.bman = v.count.realname;
          t.extra = v.count.extra;
          return t;
        });
        setData(d);
        settotal(res.total);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page]);
  return (
    <div>
      <div style={{  marginBottom: '16px', marginRight: '16px', textAlign: 'right' }}>
        <Download />
      </div>
      <Table dataSource={data} tableWidth={2000} >
        <Table.Column title="编号" dataIndex="case_id" align="center" width={140} />
        <Table.ColumnGroup title="主分析" align="center">
          <Table.Column title="分析1" dataIndex="ma_1" align="center" />
          <Table.Column title="分析2" dataIndex="ma_2" align="center" />
          <Table.Column title="分析3" dataIndex="ma_3" align="center" />
          <Table.Column title="核型" dataIndex="maxy" align="center" />
          <Table.Column title="分析师" dataIndex="maman" align="center" />
        </Table.ColumnGroup>
        <Table.ColumnGroup title="辅分析" align="center">
          <Table.Column title="辅分析1" dataIndex="ca_1" align="center" />
          <Table.Column title="辅分析2" dataIndex="ca_2" align="center" />
          <Table.Column title="核型" dataIndex="caxy" align="center" />
          <Table.Column title="分析师" dataIndex="caman" align="center" />
        </Table.ColumnGroup>
        <Table.ColumnGroup title="计数" align="center">
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
          <Table.Column title="备注" dataIndex="remark" align="center" />
          <Table.Column title="计数员" dataIndex="bman" align="center" />
          <Table.Column title="加数" dataIndex="extra" align="center" cell={renderCell} width={100} />
        </Table.ColumnGroup>
      </Table>
      <Pagination pageSize={pageSize} total={total} onChange={change} style={{ marginTop: '16px' }} />
      <Dialog title={`${detail[0] ? detail[0].case_id : ''}加数详情`} visible={visible} onClose={onClose} footer={false} height="500px">
        <div className="mb10">
          <Table dataSource={detail} emptyContent="">
            {/* <Table.Column title="编号" dataIndex="case_id" width={120} align="center" cell={(v) => <div style={{ width: '120px' }}>{v}</div>} /> */}
            <Table.Column title="加数1" dataIndex="0" width={90} align="center" />
            <Table.Column title="加数2" dataIndex="1" width={90} align="center" />
            <Table.Column title="加数3" dataIndex="2" width={90} align="center" />
            <Table.Column title="加数4" dataIndex="3" width={90} align="center" />
            <Table.Column title="加数5" dataIndex="4" width={90} align="center" />
            <Table.Column title="加数6" dataIndex="5" width={90} align="center" />
            <Table.Column title="加数7" dataIndex="6" width={90} align="center" />
            <Table.Column title="加数8" dataIndex="7" width={90} align="center" />
            <Table.Column title="加数9" dataIndex="8" width={90} align="center" />
            <Table.Column title="加数10" dataIndex="9" width={90} align="center" />
          </Table>
        </div>
        <div className="mb10">
          <Table dataSource={detail} emptyContent="">
            {/* <Table.Column title="编号" dataIndex="case_id" width={120} align="center" cell={(v) => <div style={{ width: '120px' }}>{v}</div>} /> */}
            <Table.Column title="加数11" dataIndex="10" width={90} align="center" />
            <Table.Column title="加数12" dataIndex="11" width={90} align="center" />
            <Table.Column title="加数13" dataIndex="12" width={90} align="center" />
            <Table.Column title="加数14" dataIndex="13" width={90} align="center" />
            <Table.Column title="加数15" dataIndex="14" width={90} align="center" />
            <Table.Column title="加数16" dataIndex="15" width={90} align="center" />
            <Table.Column title="加数17" dataIndex="16" width={90} align="center" />
            <Table.Column title="加数18" dataIndex="17" width={90} align="center" />
            <Table.Column title="加数19" dataIndex="18" width={90} align="center" />
            <Table.Column title="加数20" dataIndex="19" width={90} align="center" />
          </Table>
        </div>
        <div className="mb10">
          <Table dataSource={detail} emptyContent="">
            {/* <Table.Column title="编号" dataIndex="case_id" width={120} align="center" cell={(v) => <div style={{ width: '120px' }}>{v}</div>} /> */}
            <Table.Column title="加数21" dataIndex="20" width={90} align="center" />
            <Table.Column title="加数22" dataIndex="21" width={90} align="center" />
            <Table.Column title="加数23" dataIndex="22" width={90} align="center" />
            <Table.Column title="加数24" dataIndex="23" width={90} align="center" />
            <Table.Column title="加数25" dataIndex="24" width={90} align="center" />
            <Table.Column title="加数26" dataIndex="25" width={90} align="center" />
            <Table.Column title="加数27" dataIndex="26" width={90} align="center" />
            <Table.Column title="加数28" dataIndex="27" width={90} align="center" />
            <Table.Column title="加数29" dataIndex="28" width={90} align="center" />
            <Table.Column title="加数30" dataIndex="29" width={90} align="center" />
          </Table>
        </div>
      </Dialog>
    </div>
  );
}
