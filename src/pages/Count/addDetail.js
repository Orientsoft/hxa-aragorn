import React from 'react';
import { Table, Dialog, Message } from '@alifd/next';
import { request, store } from 'ice';
import EditCell from '@/component/EditCell';

export default function AddDetail({ tmpData }) {
  const [userState] = store.useModel('user');
  const [valueStatus, addDispatch] = store.useModel('addData');

  const onClose = () => {
    addDispatch.update({ visible: false, data: [] });
    // setAddData({ visible: false, data: [] });
  };
  const onSubmit = (caseid, key, value) => {
    const reqData = { case_id: caseid, extra: [] };
    const record = tmpData.current.find((v) => v.case_id === caseid);

    for (let j = 0; j < 30; j += 1) {
      reqData.extra[j] = record.extra[j] || '';
    }

    // reqData.extra = record.extra.slice();
    reqData.extra[key] = value;
    return request({
      url: window.gurl + '/count',
      method: 'patch',
      data: reqData,
    })
      .then(() => {
        Message.success('保存成功');
        record.extra[key] = value;
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Dialog title={`${valueStatus.data[0] ? valueStatus.data[0].case_id : ''}加数详情`} visible={valueStatus.visible} onClose={onClose} footer={false} height="400px">
      <div className="clear-table-padding mb10">
        <Table dataSource={valueStatus.data} emptyContent="">
          {/* <Table.Column title="编号" dataIndex="case_id" width={120} align="center" cell={(v) => <div style={{ width: '120px' }}>{v}</div>} /> */}
          <Table.Column title="加数1" dataIndex="0" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="0" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数2" dataIndex="1" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="1" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数3" dataIndex="2" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="2" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数4" dataIndex="3" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="3" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数5" dataIndex="4" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="4" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数6" dataIndex="5" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="5" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数7" dataIndex="6" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="6" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数8" dataIndex="7" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="7" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数9" dataIndex="8" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="8" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数10" dataIndex="9" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="9" onSubmit={onSubmit} />} align="center" />
        </Table>
      </div>
      <div className="clear-table-padding mb10">
        <Table dataSource={valueStatus.data} emptyContent="">
          {/* <Table.Column title="编号" dataIndex="case_id" width={120} align="center" cell={(v) => <div style={{ width: '120px' }}>{v}</div>} /> */}
          <Table.Column title="加数11" dataIndex="10" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="10" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数12" dataIndex="11" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="11" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数13" dataIndex="12" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="12" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数14" dataIndex="13" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="13" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数15" dataIndex="14" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="14" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数16" dataIndex="15" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="15" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数17" dataIndex="16" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="16" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数18" dataIndex="17" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="17" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数19" dataIndex="18" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="18" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数20" dataIndex="19" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="19" onSubmit={onSubmit} />} align="center" />
        </Table>
      </div>
      <div className="clear-table-padding mb10">
        <Table dataSource={valueStatus.data} emptyContent="">
          {/* <Table.Column title="编号" dataIndex="case_id" width={120} align="center" cell={(v) => <div style={{ width: '120px' }}>{v}</div>} /> */}
          <Table.Column title="加数21" dataIndex="20" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="20" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数22" dataIndex="21" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="21" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数23" dataIndex="22" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="22" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数24" dataIndex="23" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="23" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数25" dataIndex="24" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="24" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数26" dataIndex="25" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="25" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数27" dataIndex="26" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="26" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数28" dataIndex="27" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="27" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数29" dataIndex="28" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="28" onSubmit={onSubmit} />} align="center" />
          <Table.Column title="加数30" dataIndex="29" width={90} cell={<EditCell userid={userState.id} work="count" dataIndex="29" onSubmit={onSubmit} />} align="center" />
        </Table>
      </div>
    </Dialog>
  );
}
