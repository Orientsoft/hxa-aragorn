import React, { useEffect, useState, useRef } from 'react';
import { Input, Icon, Button } from '@alifd/next';

export default function EditName({ name, handelSave }) {
  const [editable, setEditable] = useState(false);
  const input = useRef();
  const onEdit = () => {
    input.current = name;
    setEditable(true);
  };
  const onChange = (v) => {
    input.current = v;
  };
  const save = () => {
    if (input.current === name) {
      setEditable(false);
      return;
    }
    handelSave(input.current).then(() => {
      setEditable(false);
    });
  };
  return (
    <span>
      {editable ? <Input defaultValue={name} onChange={onChange} /> : name}{' '}
      {editable ? (
        <span>
          <Button type="primary" size="small" onClick={save}>保存</Button>
          <Button size="small" style={{ marginLeft: '8px' }} onClick={() => setEditable(false)}>取消</Button>
        </span>
      ) : (
        <Icon style={{ cursor: 'pointer' }} type="edit" onClick={onEdit} />
      )}
    </span>
  );
}
