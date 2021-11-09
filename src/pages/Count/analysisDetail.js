import React from 'react';
import { Table, Dialog } from '@alifd/next';
import { store } from 'ice';

export default function AnalysisDetail() {
  const [value, valueDispatch] = store.useModel('detailData');
  
  const onClose = () => {
    valueDispatch.update({ visible: false, data: [] });
  };

  return (
    <Dialog title="分析详情" visible={value.visible} onClose={onClose} footer={false}>
      <Table dataSource={value.data}>
        <Table.Column title="编号" dataIndex="case_id" align="center" />
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
      </Table>
    </Dialog>

  );
}
