---
nav:
  title: 指南
  order: -1
group:
  title: 介绍
  order: 1
---

# 安装与使用

```bash

$ npm install tyhelpers --save

```

or

```bash

$ yarn add tyhelpers -s

```

## 使用举例

```jsx|pure

import React, { useState, FC } from 'react';
import { Button, message } from 'antd';
import { BackDrop } from 'tyhelpers';

const Example: FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    return <>
        <Button
            type="primary"
            onClick={() => {
                setOpen(true);
            }}
        >点我开启全屏遮幕</Button>
        <BackDrop
            open={open}
            onDropClick={() => {
                message.success('我透过 onDropClick 事件控制 open 来关闭了 BackDrop', 5);
                setOpen(false);
            }}
        />
    </>
}

export default Example;

```
