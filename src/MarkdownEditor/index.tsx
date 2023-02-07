import React, { FC } from 'react';
import RichText, { IMarkdownEditor } from '@uiw/react-markdown-editor';


const MarkdownEditor: FC<IMarkdownEditor> = props => {
    return <>
        <div style={{ border: '1px solid #ddd' }}>
            <RichText placeholder="请输入" minHeight="200px" {...props} />
        </div>
    </>;
}

export default MarkdownEditor;