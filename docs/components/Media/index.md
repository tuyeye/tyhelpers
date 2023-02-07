---
nav:
  title: 组件
  order: -1
group:
  title: 数据展示
  order: 0
---

# Media

可编辑的媒体文件组件，包括图片、视频和音频，可用于 Form 表单。

## 代码演示

<code src="./demo/basic.tsx" description="Media 有三种类型，分别是 `image`,`video` 和 `audio`。">基础用法</code>

<code src="./demo/form.tsx" description="基于 `Form` 的用法同 `Input` 一样的使用体验。">Form 表单项</code>

<code src="./demo/readonly.tsx" description="只读模式将会去除 `编辑` 选项。">readonly 只读模式</code>

## API

### MediaProps

| 参数     | 是否必填 | 说明                       | 类型                          | 默认值  |
| -------- | -------- | -------------------------- | ----------------------------- | ------- |
| type     | 是       | 媒体类型                   | `image` 或 `video` 或 `audio` | -       |
| readonly | 否       | 只读模式                   | `boolean`                     | `false` |
| value    | 否       | 资源链接地址               | `string`                      | -       |
| onRemove | 否       | 渲染移除按钮并且执行的事件 | `function`                    | -       |
| style    | 否       | 样式                       | `React.CSSProperties`         | -       |
| onChange | 否       | 输入框修改回调函数         | `(value: any) => void`        | -       |
