import { Button, message } from 'antd';
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
        点我开启全屏遮幕
      </Button>
      <BackDrop
        open={open}
        onDropClick={() => {
          message.success(
            '我透过 onDropClick 事件控制 open 来关闭了 BackDrop',
            5,
          );
          setOpen(false);
        }}
      />
    </>
  );
};

export default Example;
