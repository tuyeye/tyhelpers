---
nav:
  title: 组件
  order: -1
group:
  title: 数据展示
  order: -1
demo:
  cols: 2
---

# BackDrop

BackDrop 全屏遮幕组件，通常用于处理异步任务。

## 代码演示

<code src="./demo/basic.tsx" description="用法和 antd 的 Modal 组件类似。可以参考：https://ant-design.antgroup.com/components/modal">基础用法</code>
<code src="./demo/func.tsx" description="使用此方式调用 BackDrop，可以实现和组件相同的体验，并且更轻量快捷。">函数调用</code>
<code src="./demo/diyText.tsx" description="透传 icon 和 tip 来自定义配置显示的图标和文本。">自定义图标和文本</code>
<code src="./demo/promise.tsx" description="组件内置了包裹异步方法的调用，可以无缝使用 BackDrop 组件。">包裹异步方法</code>

## API

### BackDropProps

类型可以直接从包中引入：`import { BackDropProps } from 'tyhelpers';`

| 参数        | 说明           | 类型                      | 默认值        |
| ----------- | -------------- | ------------------------- | ------------- |
| open        | 是否开启       | `boolean`                 | -             |
| icon        | 图标           | `JSX.Element`             | -             |
| tip         | 提示文本       | `string` 或 `JSX.Element` | `loading ...` |
| onDropClick | 点击遮罩的事件 | `() => void`              | -             |

### 函数调用

- `BackDrop.open(tip,config);`
- `BackDrop.close();`

#### BackDrop.open 参数

| 参数   | 是否必填 | 说明          | 类型                            | 默认值        |
| ------ | -------- | ------------- | ------------------------------- | ------------- |
| tip    | 否       | 提示文本      | `string` 或 `JSX.Element`       | `loading ...` |
| config | 否       | BackDropProps | [BackDropProps](#backdropprops) | -             |

#### BackDrop.close

`BackDrop.close()` 仅可用于关闭使用 `BackDrop.open(tip,config);` 开启的遮幕，不能关闭组件方式的开启的遮幕，组件方式请使用 `open` 属性来控制遮幕的开启或关闭。

### 包裹异步方法

- `BackDrop.promise(tip,task,config);`

使用此方式，无需关注 BackDrop 的状态，异步任务开始时会自动开启遮幕，结束时自动关闭遮幕，并且原样返回异步任务的返回值。

| 参数   | 是否必填 | 说明          | 类型                            | 默认值 |
| ------ | -------- | ------------- | ------------------------------- | ------ |
| tip    | 是       | 提示文本      | `string` 或 `JSX.Element`       | -      |
| task   | 是       | 异步任务      | `() => promise<any>`            | -      |
| config | 否       | BackDropProps | [BackDropProps](#backdropprops) | -      |
