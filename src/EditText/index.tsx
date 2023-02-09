import React, { FC } from 'react';
import { Typography } from 'antd';

export declare type EditTextProps = {
    /**
     * 值
     */
    value?: string;
    /**
     * onChange 回调事件，value:string => void;
     */
    onChange?: any;
    /**
     * 样式
     */
    style?: React.CSSProperties;
};

const EditText: FC<EditTextProps> = props => {

    const { value, onChange, style } = props;

    return <>
        <Typography.Paragraph
            style={{ paddingLeft: 12, paddingTop: 5,...style  }}
            editable={{
                tooltip: '编辑',
                triggerType: value ? ['text'] : ['icon'],
                onChange: value => {
                    onChange && onChange(value);
                },
            }}
        >
            {value}
        </Typography.Paragraph>
    </>
}

export default EditText;