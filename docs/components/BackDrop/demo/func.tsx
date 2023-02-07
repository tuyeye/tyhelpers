import React, { useState, FC } from 'react';
import { Button, message } from 'antd';
import { BackDrop } from 'tyhelpers';

const Example: FC = () => {
    return <>
        <Button
            type="primary"
            onClick={() => {
                BackDrop.open('我是透过函数开启的',
                    {
                        onDropClick: () => {
                            message.success('我透过函数关闭了 BackDrop', 5);
                            BackDrop.close();
                        }
                    }
                );
            }}
        >用函数来开启遮幕</Button>
    </>;
}

export default Example;