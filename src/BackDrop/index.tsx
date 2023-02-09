import { LoadingOutlined } from '@ant-design/icons';
import { Space, Spin } from 'antd';
import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export declare type backDropProps = {
  /**
   * 是否开启
   */
  open: boolean;

  /**
   * 图标
   */
  icon?: JSX.Element;

  /**
   * 提示文本
   */
  tip?: string | JSX.Element;

  /**
   * 点击遮罩的事件
   */
  onDropClick?: () => void;
};

/**
 * 組件化調用
 * @param param0
 */
const Page: FC<backDropProps> = ({ open, tip, onDropClick, icon }) => {
  const theTip = tip ?? 'loading ...';

  const antIcon = icon ?? <LoadingOutlined style={{ fontSize: 35 }} spin />;

  const onClick = () => {
    if (onDropClick) {
      onDropClick();
    }
  };

  if (!open) return <></>;

  return (
    <div className="loadingActive" onClick={onClick}>
      <Space direction="vertical" align="center">
        <Spin indicator={antIcon} style={{ color: '#fff' }} />
        <p style={{ color: '#fff' }}>{theTip}</p>
      </Space>
    </div>
  );
};

/**
 * 透过函数调用
 * @param tip 提示文本
 * @param config backDropProps：open & icon & tip & onDropClick
 */
function open(tip?: string | JSX.Element, config?: backDropProps) {
  let theDiv = document.createElement('div');
  theDiv.id = 'backDrop1';
  document.body.appendChild(theDiv);

  // 初始化 tip
  const theTip = arguments.length === 0 ? 'loading ...' : tip;

  ReactDOM.render(<Page {...config} open tip={theTip} />, theDiv);
}

/**
 * 透过函数关闭
 */
const close = () => {
  let theDiv = document.getElementById('backDrop1');
  if (theDiv) {
    document.body.removeChild(theDiv);
  }
};

/**
 * 包裹 BackDrop 的异步方法
 * @param tip 提示文本
 * @param task 异步任务
 * @param config open 的 config
 * @returns 返回异步方法的返回值
 */
const promise = async (
  tip: string | JSX.Element,
  task: () => Promise<any>,
  config?: backDropProps,
) => {
  open(tip, config);
  const res = await task();
  close();
  return res;
};

const BackDrop = Page as typeof Page & {
  open: typeof open;
  close: typeof close;
  promise: typeof promise;
};
BackDrop.open = open;
BackDrop.close = close;
BackDrop.promise = promise;

export default BackDrop;
