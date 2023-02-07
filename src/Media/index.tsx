import React, { FC, useState, useRef, useEffect } from 'react';
import { Image, Space, Input, notification } from 'antd';
import type { InputRef } from 'antd';
import { DeleteFilled, EditOutlined, EyeOutlined, PictureOutlined } from '@ant-design/icons';
import './index.css';

declare type InputModeProps = {
    value: string;
    onBlur: () => void;
    onValueChange: (value: string) => void;
    onFormItemChange?: (value: string) => void;
};
// 输入框
const InputMode: FC<InputModeProps> = ({
    value, onBlur, onValueChange, onFormItemChange
}) => {

    const inputRef = useRef<InputRef>(null);

    const [inputValue, setInputValue] = useState<string>(value);

    useEffect(() => {
        inputRef && inputRef.current.focus({ cursor: 'end' });
    }, [inputRef]);

    return <>
        <Input.TextArea
            ref={inputRef}
            placeholder='请输入资源链接地址'
            value={inputValue}
            onChange={e => {
                // 设置本组件的内容
                setInputValue(e.target.value);
                // 设置上游组件的内容
                onValueChange(e.target.value);
                // 设置 FormItem
                onFormItemChange && onFormItemChange(e.target.value);
            }}
            onBlur={onBlur}
            style={{ width: '100%', height: '100%', resize: 'none' }}
        />
    </>
}

declare type FormItemProps = {
    onChange?: (value: any) => void;
    value?: any;
};

declare type UsualProps = {
    readonly?: boolean;
    onRemove?: () => void;
    style?: React.CSSProperties;
};

// 图片组件
const MediaImage: FC<FormItemProps & UsualProps> = props => {

    // FormItem 
    const { onChange, value, readonly, onRemove, style } = props;

    const [api, contextHolder] = notification.useNotification();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [src, setSrc] = useState<string>(value);

    const [preVisible, setPreVisible] = useState<boolean>(false);

    const ImgError = () => {
        api.error({
            message: '此链接可能会加载异常',
            description:
                <>
                    可能是由于地址：
                    <a
                        href={src}
                        target="_blank"
                        style={{ textDecoration: "underline", marginRight: 5, fontWeight: 'bold' }}
                    >
                        {src}
                    </a>
                    无法正常访问导致的，请检查地址是否有效。
                </>,
            duration: 8
        });
    }

    return <>
        <div className='tyhelpers-media-container' style={{ ...style }}>
            {editMode && <InputMode
                value={src}
                onBlur={() => { setEditMode(false); }}
                onValueChange={setSrc}
                onFormItemChange={onChange}
            />}

            {
                !editMode && <>
                    {src && <img src={src} onError={ImgError} className='tyhelpers-media-img' />}
                    {!src && <div className='tyhelpers-media-empty-container'>
                        <PictureOutlined style={{ fontSize: 30 }} />
                    </div>}
                    <div className='tyhelpers-media-hover tyhelpers-media-hover-img'>
                        <Space style={{ opacity: '0.9', fontSize: 15 }}>
                            {!readonly && <div style={{ cursor: 'pointer' }} onClick={() => { setEditMode(true); }}>
                                <EditOutlined /> 编辑
                            </div>}

                            {src && <div style={{ cursor: 'pointer' }} onClick={() => { setPreVisible(true); }}>
                                <EyeOutlined /> 原图
                            </div>}

                            {onRemove && <div
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={onRemove}
                            >
                                <DeleteFilled /> 移除
                            </div>}
                        </Space>
                    </div>
                </>
            }
        </div>

        <Image src={src} style={{ display: 'none' }} preview={{ visible: preVisible, onVisibleChange: setPreVisible }} />
        {contextHolder}
    </>;
}

// 视频组件
const MediaVideo: FC<FormItemProps & UsualProps> = props => {

    // FormItem 
    const { onChange, value, readonly, onRemove, style } = props;

    const [api, contextHolder] = notification.useNotification();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [src, setSrc] = useState<string>(value);


    const onError = () => {
        api.error({
            message: '此链接可能会加载异常',
            description:
                <>
                    可能是由于地址：
                    <a
                        href={src}
                        target="_blank"
                        style={{ textDecoration: "underline", marginRight: 5, fontWeight: 'bold' }}
                    >
                        {src}
                    </a>
                    无法正常访问导致的，请检查地址是否有效。
                </>,
            duration: 8
        });
    }

    return <>
        <div className='tyhelpers-media-container' style={{ ...style }}>
            {editMode && <InputMode
                value={src}
                onBlur={() => { setEditMode(false); }}
                onValueChange={setSrc}
                onFormItemChange={onChange}
            />}

            {
                !editMode && <>
                    <video
                        src={src}
                        onError={onError}
                        className='tyhelpers-media-video'
                        controls
                    />
                    {(!readonly || onRemove) && <div className='tyhelpers-media-hover tyhelpers-media-hover-video'>
                        <Space size='large' style={{ opacity: '0.85', fontSize: 15 }}>
                            {!readonly && <div style={{ cursor: 'pointer' }} onClick={() => { setEditMode(true); }}>
                                <EditOutlined /> 编辑
                            </div>}

                            {onRemove && <div
                                style={{ color: 'red', cursor: 'pointer' }}
                                onClick={onRemove}
                            >
                                <DeleteFilled /> 移除
                            </div>}
                        </Space>
                    </div>}
                </>
            }
        </div>
        {contextHolder}
    </>;
}

// 音频组件
const MediaAudio: FC<FormItemProps & UsualProps> = props => {

    // FormItem 
    const { onChange, value, readonly, onRemove, style } = props;

    const [api, contextHolder] = notification.useNotification();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [src, setSrc] = useState<string>(value);


    const onError = () => {
        api.error({
            message: '此链接可能会加载异常',
            description:
                <>
                    可能是由于地址：
                    <a
                        href={src}
                        target="_blank"
                        style={{ textDecoration: "underline", marginRight: 5, fontWeight: 'bold' }}
                    >
                        {src}
                    </a>
                    无法正常访问导致的，请检查地址是否有效。
                </>,
            duration: 8
        });
    }

    return <>
        <div className='tyhelpers-media-container' style={{ background: 'rgb(241,243,244)', ...style, minHeight: 250 }}>
            {editMode && <InputMode
                value={src}
                onBlur={() => { setEditMode(false); }}
                onValueChange={setSrc}
                onFormItemChange={onChange}
            />}
            {
                !editMode && <>
                    <audio
                        src={src}
                        onError={onError}
                        className='tyhelpers-media-audio'
                        controls
                    />

                    {(!readonly || onRemove) &&
                        <div className='tyhelpers-media-hover tyhelpers-media-hover-audio'>
                            <Space
                                size='large'
                                style={{
                                    opacity: '0.85',
                                    position: 'absolute',
                                    top: '25%',
                                    fontSize: 15
                                }}
                            >
                                {!readonly && <div style={{ cursor: 'pointer' }} onClick={() => { setEditMode(true); }}>
                                    <EditOutlined /> 编辑
                                </div>}

                                {onRemove && <div
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={onRemove}
                                >
                                    <DeleteFilled /> 移除
                                </div>}
                            </Space>
                        </div>
                    }
                </>
            }
        </div>
        {contextHolder}
    </>;
}


export declare type MediaProps = {
    /**
     * 媒体类型
     */
    type: 'image' | 'video' | 'audio';

    /**
     * 是否只读
     */
    readonly?: boolean;

    /**
     * URL
     */
    value?: string;

    /**
     * 渲染移除按钮并且执行的事件
     */
    onRemove?: () => void;

    /**
     * 样式
     */
    style?: React.CSSProperties;

    /**
     * 输入框修改回调函数
     */
    onChange?: (value: any) => void;
};

const Media: FC<MediaProps> = props => {

    const { type } = props;

    switch (type) {
        case 'image':
            return <MediaImage {...props} />;
        case 'video':
            return <MediaVideo {...props} />;
        case 'audio':
            return <MediaAudio {...props} />
        default:
            return <></>;
    }

}

export default Media;