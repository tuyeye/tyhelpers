import React, { useState, FC } from 'react';
import { Button, message } from 'antd';
import { BackDrop } from 'tyhelpers';

const Example: FC = () => {

    // 模拟异步任务
    const promiseTask = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('return promise resolve');
            }, 2000);
        });
    }

    const clickHandler = async () => {
        const result = await BackDrop.promise('这是一个异步任务，耗时两秒钟 ...', promiseTask);
        message.success(result);
    }

    return <Button type="primary" onClick={clickHandler}>我是一个包裹了 BackDrop 的异步方法</Button>;
}

export default Example;