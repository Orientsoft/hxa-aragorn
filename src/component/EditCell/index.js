import React, { useRef, useState } from 'react';
import { Input, message } from '@alifd/next';
import { request } from 'ice';

function EditCell({ value, dataIndex, record, onSubmit, width, work, userid, check }) {

  const tmp = useRef(value);
  const [v, sv] = useState(value);
  const onChange = (va) => { sv(va); };
  const onKeyDown = (e) => {
    const { keyCode } = e;
    if (keyCode > 36 && keyCode < 41) {
      e.stopPropagation();
      return;
    }
    if (keyCode == 13) {
      onSubmit(record.case_id, dataIndex, v, record)
        .then(() => {
          tmp.current = v;
        })
        .catch((e) => {
          console.log(e, '-', tmp.current);
          sv(tmp.current);
        });
    }
  };
  const onBlur = () => {
    if (tmp.current === v) {
      return;
    }
    onSubmit(record.case_id, dataIndex, v, record)
      .then(() => {
        tmp.current = v;
      })
      .catch((e) => {
        console.log(e);
        sv(tmp.current);
      });
  };
  let disabled = false;
  if (work === 'count') {
    disabled = (userid !== record.edit_user);
  } else if (work === 'MA') {
    disabled = (userid !== record.m_edit_user);
  } else {
    disabled = (userid !== record.c_edit_user);
  }

  const style = { width: width || '85px' };
  if (check) {
    const t1 = record.maxy ? record.maxy.trim() : '';
    const t2 = record.caxy ? record.caxy.trim() : '';
    if (t1 !== t2) {
      style.border = '1px #d23c26 solid';
    }
  }
  let cv = v;
  if ((dataIndex === 'maxy' || dataIndex === 'caxy') && disabled) {
    cv = '***';
  }
  return (<Input disabled={disabled} value={cv} style={style} onKeyDown={onKeyDown} onBlur={onBlur} onChange={onChange} />);
}

export default React.memo(EditCell);
