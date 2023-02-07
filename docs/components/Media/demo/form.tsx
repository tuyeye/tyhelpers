import React, { useState, FC } from 'react';
import { Button, message, Divider, Form, Input, Typography } from 'antd';
import { Media } from 'tyhelpers';

const Example: FC = () => { 

    const [formValue, setFormValue] = useState({});
    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
    const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } };
    return <>
        <Form
            {...formItemLayout}
            onFinish={setFormValue}
            initialValues={{
                audio: 'https://twoyecloud.oss-cn-beijing.aliyuncs.com/files/2022-11-18/oIyv2AKigDgP2DojNdebABgVYAhfLkQp9DnPAi.MP4',
                video: 'https://twoyecloud.oss-cn-beijing.aliyuncs.com/files/2022-11-18/oIyv2AKigDgP2DojNdebABgVYAhfLkQp9DnPAi.MP4',
                image: 'https://twoyecloud.oss-cn-beijing.aliyuncs.com/files/2022-06-03/855a176d10184cba8d5c9d7e94647fe9.jpg',
            }}
        >
            <Form.Item label='名称' name='name' rules={[{ required: true, message: '请输入名称' }]}>
                <Input placeholder='请输入' />
            </Form.Item>

            <Form.Item label='音频项' name='audio' rules={[{ required: true, message: '请输入音频链接' }]}>
                <Media type='audio' style={{ height: 150 }} />
            </Form.Item>

            <Form.Item label='视频项' name='video' rules={[{ required: true, message: '请输入视频链接' }]}>
                <Media type='video' />
            </Form.Item>

            <Form.Item label='图片项' name='image' rules={[{ required: true, message: '请输入图片链接' }]}>
                <Media type='image' />
            </Form.Item>
            <Form.Item {...buttonItemLayout}>
                <Button type="primary" htmlType="submit" >
                    提交
                </Button>
            </Form.Item>
        </Form>

        <p>表单结果：</p>
        <pre>{JSON.stringify(formValue, null, 2)}</pre>
    </>;
}

export default Example;