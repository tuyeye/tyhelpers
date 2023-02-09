import React from 'react';
import { Spin, Card } from 'antd';

export declare type ContentLoadingProps = {
    tip?: string;
    height?: number;
};

export const ContentLoading: React.FC<ContentLoadingProps> = ({ tip, height }) => <Spin spinning tip={tip ?? "载入中，请稍候..."} ><Card style={{ height: height ?? 200 }}></Card></Spin>;

export default ContentLoading;