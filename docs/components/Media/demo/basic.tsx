import { message, Tabs } from 'antd';
import React from 'react';
import { Media } from 'tyhelpers';

export default (): JSX.Element => {
  return (
    <>
      <Tabs
        defaultActiveKey="1"
        destroyInactiveTabPane
        items={[
          {
            label: '视频媒体 - video',
            key: '1',
            children: (
              <>
                <Media
                  type="video"
                  value="https://twoyecloud.oss-cn-beijing.aliyuncs.com/files/2022-11-18/oIyv2AKigDgP2DojNdebABgVYAhfLkQp9DnPAi.MP4"
                  onRemove={() => {
                    message.success('点击了移除按钮');
                  }}
                />
              </>
            ),
          },
          {
            label: '图片媒体 - image',
            key: '2',
            children: (
              <>
                <Media
                  type="image"
                  value="https://twoyecloud.oss-cn-beijing.aliyuncs.com/files/2022-06-03/855a176d10184cba8d5c9d7e94647fe9.jpg"
                  onRemove={() => {
                    message.success('点击了移除按钮');
                  }}
                />
              </>
            ),
          },

          {
            label: '音频媒体 - audio',
            key: '3',
            children: (
              <>
                <Media
                  type="audio"
                  value="https://twoyecloud.oss-cn-beijing.aliyuncs.com/files/2022-11-18/oIyv2AKigDgP2DojNdebABgVYAhfLkQp9DnPAi.MP4"
                  onRemove={() => {
                    message.success('点击了移除按钮');
                  }}
                />
              </>
            ),
          },
        ]}
      />
    </>
  );
};
