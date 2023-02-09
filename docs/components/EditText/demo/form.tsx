import React, { useState, FC } from 'react';
import { Button, Form, Input } from 'antd';
import { EditText } from 'tyhelpers';

const Example: FC = () => {

    const [formValue, setFormValue] = useState({});
    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 14 } };
    const buttonItemLayout = { wrapperCol: { span: 14, offset: 4 } };
    return <>
        <Form
            {...formItemLayout}
            onFinish={setFormValue}
            initialValues={{
                content: '这是 Form 预设置的内容'
            }}
        >
            <Form.Item label='名称' name='name' rules={[{ required: true, message: '请输入名称' }]}>
                <Input placeholder='请输入' />
            </Form.Item>

            <Form.Item label='可编辑文本' name='content' rules={[{ required: true, message: '请输入文本内容' }]}>
                <EditText />
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