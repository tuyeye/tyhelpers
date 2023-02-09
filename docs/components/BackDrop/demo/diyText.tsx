import { SmileOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC, useState } from 'react';
import { BackDrop } from 'tyhelpers';

const Example: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setOpen(true);
        }}
      >
        自定义图标和文本
      </Button>
      <BackDrop
        open={open}
        icon={<SmileOutlined />}
        tip={<div style={{ color: '#f50' }}>我是自定义文本</div>}
        onDropClick={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default Example;
