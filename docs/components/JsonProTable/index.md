---
nav:
  title: 组件
  order: -1
group:
  title: 数据展示
  order: 0
---

# JsonProTable

一款通过 Json 字符串来渲染生成的表格，支持 CRUD 操作，快速开始一个数据表格。基于 `antd procomponent` 二次封装开发。

## API

### ProTableProps

扩展的属性：

| 参数                    | 是否必填 | 说明                                     | 类型                      | 默认值 |
| ----------------------- | -------- | ---------------------------------------- | ------------------------- | ------ |
| JsonProTableUpdateProps | 否       | 如果需要更新功能，请配置此属性           | `JsonProTableUpdateProps` | -      |
| JsonProTableCreateProps | 否       | 如果需要新建功能，请配置此属性           | `JsonProTableCreateProps` | -      |
| JsonProTableProps       | 否       | 如果需要 JSON 生成表格功能，请配置此属性 | `JsonProTableProps`       | -      |

组件基于 `ProTable` 组件开发，继承其全部属性，此处不再赘述，[点此查看 ProTableProps](https://procomponents.ant.design/components/table?current=1&pageSize=5#protable) 。

### Update

##### JsonProTableUpdateProps

| 参数            | 是否必填 | 说明                                                                                   | 类型                                                                               |
| --------------- | -------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| propsRequest    | 否       | 请求 props 的异步方法，通常用于从后端请求 props 字符串，完成动态可配置的 props（可选） | `(stringToProps) => Promise<ProFormProps>`                                         |
| columnsRequest  | 否       | 请求 columns[] 的异步方法，通常用于从后端请求数组，完成动态可配置的 columns[]（可选）  | `(stringToProps) => Promise<ProFormColumnsType<T, ValueType>[]>`                   |
| dataRequest     | 否       | 基于 ProForm 的 request 改造，将更新表单中的默认值从远程请求数据                       | `(row: Record<any, T>) => Promise<Record<any, T>>`                                 |
| onUpdate        | 否       | 更新提交的方法，返回一个 `Promise<boolean>` 对象                                       | `(value: any, action?: ActionType, updateRow: Record<any, T>) => Promise<boolean>` |
| customFormItems | 否       | 若 json 字符串创建的 Form 表单不满足需求，可以通过此属性配置自定义表单项目             | `(form: FormInstance) => JSX.Element[]`                                            |

##### 用法举例

- `propsRequest`

```javascript
async (stringToProps) => {
  const res = await request('/apipath');
  return stringToProps(res);
};
```

- `columnsRequest`

```javascript
async (stringToProps) => {
  const res = await request(`/apipath`);
  return (res.data || []).map((e: any) => stringToProps(JSON.stringify(e)));
};
```

- `dataRequest`

```javascript
async (row) => {
  const res = await request(`/apipath/${row.id}`);
  return res.data;
};
```

- `onUpdate`

```javascript
async (value, action, row) => {
  const res = await request(`/apipath/${row.id}`, {
    method: 'put',
    data: value,
  });
  message.success('修改成功');
  action?.reload();
  return true;
};
```

- `customFormItems`

```javascript
(form) => [
  <Form.Item key="i1">
    <div onClick={() => form.setFieldsValue({ test1: '1' })}>item1</div>
  </Form.Item>,
];
```

##### 完整参数说明：

```javascript

 JsonProTableUpdateProps?: {
        /**
         * 请求 props 的异步方法，通常用于从后端请求 props 字符串，完成动态可配置的 props（可选）
         * @example
         * propsRequest = async (stringToProps) => {
         *     const res = await request('/apipath');
         *     return stringToProps(res);
         * }
         * @function stringToProps() 内置将 json 字符串转为 js 对象的方法
         * @param propsStr 待解析的字符串
         * @param objectEnum 字符串枚举，将会在此枚举中寻找 js 对象并创建
         * @param agreementChar 自定义约定字符，默认 from_object_enum，取值则是将字符后的字符串作为 key 从 objectEnum 中取对象，例如：from_object_enum_table_request，若 objectEnum 存在，则会从中取 key 为 _table_request 的值
         */
        propsRequest?: (stringToProps: (propsStr: string, objectEnum?: {
            [name: string]: any;
        } | undefined, agreementChar?: string | undefined) => object) => Promise<ProFormProps>;

        /**
         * 请求 columns[] 的异步方法，通常用于从后端请求数组，完成动态可配置的 columns[]（可选）
         * @example
         * columnsRequest = async (stringToProps) => {
         *     const res = await request(`/apipath`);
         *     return (res.data || []).map((e: any) => stringToProps(JSON.stringify(e)));
         * }
         * @function stringToProps() 内置将 json 字符串转为 js 对象的方法
         * @param propsStr 待解析的字符串
         * @param objectEnum 字符串枚举，将会在此枚举中寻找 js 对象并创建
         * @param agreementChar 自定义约定字符，默认 from_object_enum，取值则是将字符后的字符串作为 key 从 objectEnum 中取对象，例如：from_object_enum_table_request，若 objectEnum 存在，则会从中取 key 为 _table_request 的值
         */
        columnsRequest?: (stringToProps: (propsStr: string, objectEnum?: {
            [name: string]: any;
        } | undefined, agreementChar?: string | undefined) => object) => Promise<ProFormColumnsType<T, ValueType>[]>;

        /**
         * 基于 ProForm 的 request 改造，将更新表单中的默认值从远程请求数据
         * @example
         *  dataRequest = async (row) => {
         *      const res = await request(`/apipath/${row.id}`)
         *      return res.data;
         * }
         * @param row 代表当前行的数据
         */
        dataRequest?: (row: Record<any, T>) => Promise<Record<any, T>>;

        /**
         * 更新提交的方法，返回一个 Promise<boolean> 对象
         * @example
         * onUpdate = async (value, action, row) => {
         *      const res = await request(`/apipath/${row.id}`, { method: "put", data: value });
         *      message.success("修改成功");
         *      action?.reload();
         *      return true;
         * }
         * @param value 表单的值
         * @param action 表格 ActionType
         * @param row 当前编辑的行
         */
        onUpdate?: (value: any, action: ActionType | undefined, updateRow: Record<any, T>) => Promise<boolean>;

        /**
         * 若 json 字符串创建的 Form 表单不满足需求，可以通过此属性配置自定义表单项目
         * @see 提示：customFormItems 和 json 配置的表单互不影响，优先显示 customFormItems 的内容，再显示 json 生成的表单内容
         * @example
         * customFormItems = (form) => [<Form.Item key="i1"><div onClick={() => form.setFieldsValue({ test1: "1" })}>item1</div></Form.Item>];
         */
        customFormItems?: (form: FormInstance) => JSX.Element[];
    };

```

### Create

##### JsonProTableCreateProps

| 参数                | 是否必填 | 说明                                                                                   | 类型                                                             |
| ------------------- | -------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| propsRequest        | 否       | 请求 props 的异步方法，通常用于从后端请求 props 字符串，完成动态可配置的 props（可选） | `(stringToProps) => Promise<ProFormProps>`                       |
| columnsRequest      | 否       | 请求 columns[] 的异步方法，通常用于从后端请求数组，完成动态可配置的 columns[]（可选）  | `(stringToProps) => Promise<ProFormColumnsType<T, ValueType>[]>` |
| onCreate            | 否       | 创建时的方法                                                                           | `(value: any, action?: ActionType) => Promise<boolean>`          |
| customCreateTrigger | 否       | 自定义创建按钮，可以替换掉默认的创建按钮                                               | `JSX.Element`                                                    |
| customFormItems     | 否       | 若 json 字符串创建的 Form 表单不满足需求，可以通过此属性配置自定义表单项目             | `(form: FormInstance) => JSX.Element[]`                          |

##### 用法举例

- `propsRequest`

```javascript
async (stringToProps) => {
  const res = await request('/apipath');
  return stringToProps(res);
};
```

- `columnsRequest`

```javascript
async (stringToProps) => {
  const res = await request(`/apipath`);
  return (res.data || []).map((e: any) => stringToProps(JSON.stringify(e)));
};
```

- `onCreate`

```javascript
async (value, action) => {
  const res = await request('/apipath');
  action?.reload();
  return true;
};
```

- `customFormItems`

```javascript
(form) => [
  <Form.Item key="i1">
    <div onClick={() => form.setFieldsValue({ test1: '1' })}>item1</div>
  </Form.Item>,
];
```

##### 完整参数说明：

```javascript
        JsonProTableCreateProps?: {
            /**
             * 请求 props 的异步方法，通常用于从后端请求 props 字符串，完成动态可配置的 props（可选）
             * @example
             * propsRequest = async (stringToProps) => {
             *     const res = await request('/apipath');
             *     return stringToProps(res);
             * }
             * @function stringToProps() 内置将 json 字符串转为 js 对象的方法
             * @param propsStr 待解析的字符串
             * @param objectEnum 字符串枚举，将会在此枚举中寻找 js 对象并创建
             * @param agreementChar 自定义约定字符，默认 from_object_enum，取值则是将字符后的字符串作为 key 从 objectEnum 中取对象，例如：from_object_enum_table_request，若 objectEnum 存在，则会从中取 key 为 _table_request 的值
             */
            propsRequest?: (stringToProps: (propsStr: string, objectEnum?: {
                [name: string]: any;
            } | undefined, agreementChar?: string | undefined) => object) => Promise<ProFormProps>;

            /**
             * 请求 columns[] 的异步方法，通常用于从后端请求数组，完成动态可配置的 columns[]（可选）
             * @example
             * columnsRequest = async (stringToProps) => {
             *     const res = await request(`/apipath`);
             *     return (res.data || []).map((e: any) => stringToProps(JSON.stringify(e)));
             * }
             * @function stringToProps() 内置将 json 字符串转为 js 对象的方法
             * @param propsStr 待解析的字符串
             * @param objectEnum 字符串枚举，将会在此枚举中寻找 js 对象并创建
             * @param agreementChar 自定义约定字符，默认 from_object_enum，取值则是将字符后的字符串作为 key 从 objectEnum 中取对象，例如：from_object_enum_table_request，若 objectEnum 存在，则会从中取 key 为 _table_request 的值
             */
            columnsRequest?: (stringToProps: (propsStr: string, objectEnum?: {
                [name: string]: any;
            } | undefined, agreementChar?: string | undefined) => object) => Promise<ProFormColumnsType<T, ValueType>[]>;

            /**
             * 创建时的方法
             * @param value 表单的值
             * @param action 表格的 ActionType，可用于刷新表格，常用于创建成功后刷新表格回调，
             * @example
             * onCreate = async (value,action) => {
             *    const res = await request('/apipath');
             *    action?.reload();
             *    return true;
             * }
             */
            onCreate?: (value: any, action: ActionType | undefined) => Promise<boolean>;

            /**
             * 若 json 字符串创建的 Form 表单不满足需求，可以通过此属性配置自定义表单项目
             * @see 提示：customFormItems 和 json 配置的表单互不影响，优先显示 customFormItems 的内容，再显示 json 生成的表单内容
             * @example
             * customFormItems = (form) => [<Form.Item key="i1"><div onClick={() => form.setFieldsValue({ test1: "1" })}>item1</div></Form.Item>];
             */
            customFormItems?: (form: FormInstance) => JSX.Element[];

            /**
             * 自定义创建按钮，可以替换掉默认的创建按钮
             */
            customCreateTrigger?: JSX.Element;
        };
```

### Table

##### JsonProTableProps

| 参数                       | 是否必填 | 说明                                                                                   | 类型                                                             |
| -------------------------- | -------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| propsRequest               | 否       | 请求 props 的异步方法，通常用于从后端请求 props 字符串，完成动态可配置的 props（可选） | `(stringToProps) => Promise<ProFormProps>`                       |
| columnsRequest             | 否       | 请求 columns[] 的异步方法，通常用于从后端请求数组，完成动态可配置的 columns[]（可选）  | `(stringToProps) => Promise<ProFormColumnsType<T, ValueType>[]>` |
| JsonProTableLoading        | 否       | 表格 loadign                                                                           | `boolean`                                                        |
| customOptions              | 否       | 自定义操作栏                                                                           | `(row: Record<any, T>, action?: ActionType) => JSX.Element[]`    |
| onRemove                   | 否       | 删除时的方法                                                                           | `(row: Record<any, any>, action?: ActionType) => Promise<void>`  |
| removePopconfirmTitle      | 否       | 删除时的提醒                                                                           | `(row: Record<any, any>) => string`                              |
| customTableLoadingSpinNode | 否       | 表格生成时的 loading 组件，若不喜欢自带的 loadign 全屏组件,可以通过此组件自定义        | `JSX.Element`                                                    |
| customUpdateText           | 否       | 自定义编辑文字                                                                         | `string`                                                         |

##### 用法举例

- `propsRequest`

```javascript
async (stringToProps) => {
  const res = await request('/apipath');
  return stringToProps(res);
};
```

- `columnsRequest`

```javascript
async (stringToProps) => {
  const res = await request(`/apipath`);
  return (res.data || []).map((e: any) => stringToProps(JSON.stringify(e)));
};
```

- `customOptions`

```javascript
(row, action) => [<a key="i1">操作1</a>];
```

- `onRemove`

```javascript
async (row, action) => {
  const res = await request('/apipath');
  action?.reload();
};
```

- `removePopconfirmTitle`

```javascript
(row) => `你确定要删除 ID 为 ${row.id} 的数据吗？`;
```

##### 完整参数说明

```javascript
   JsonProTableProps?: {
        /**
         * 请求 props 的异步方法，通常用于从后端请求 props 字符串，完成动态可配置的 props（可选）
         * @example
         * propsRequest = async (stringToProps) => {
         *     const res = await request('/apipath');
         *     return stringToProps(res);
         * }
         * @function stringToProps() 内置将 json 字符串转为 js 对象的方法
         * @param propsStr 待解析的字符串
         * @param objectEnum 字符串枚举，将会在此枚举中寻找 js 对象并创建
         * @param agreementChar 自定义约定字符，默认 from_object_enum，取值则是将字符后的字符串作为 key 从 objectEnum 中取对象，例如：from_object_enum_table_request，若 objectEnum 存在，则会从中取 key 为 _table_request 的值
         */
        propsRequest: (stringToProps: (propsStr: string, objectEnum?: {
            [name: string]: any;
        } | undefined, agreementChar?: string | undefined) => object) => Promise<ProTableProps<T, U, ValueType>>;

        /**
         * 请求 columns[] 的异步方法，通常用于从后端请求数组，完成动态可配置的 columns[]（可选）
         * @example
         * columnsRequest = async (stringToProps) => {
         *     const res = await request(`/apipath`);
         *     return (res.data || []).map((e: any) => stringToProps(JSON.stringify(e)));
         * }
         * @function stringToProps() 内置将 json 字符串转为 js 对象的方法
         * @param propsStr 待解析的字符串
         * @param objectEnum 字符串枚举，将会在此枚举中寻找 js 对象并创建
         * @param agreementChar 自定义约定字符，默认 from_object_enum，取值则是将字符后的字符串作为 key 从 objectEnum 中取对象，例如：from_object_enum_table_request，若 objectEnum 存在，则会从中取 key 为 _table_request 的值
         */
        columnsRequest: (stringToProps: (propsStr: string, objectEnum?: {
            [name: string]: any;
        } | undefined, agreementChar?: string | undefined) => object) => Promise<ProColumns<T, ValueType>[]>;

        /** 表格 loadign */
        JsonProTableLoading?: boolean;

        /**
         * 自定义操作栏
         * @example
         * customOptions = (row,action) => [<a key="i1">操作1</a>]
         * @param row 当前行
         * @param action table ActionType ，通常用于刷新表格
         */
        customOptions?: (row: Record<any, T>, action?: ActionType) => JSX.Element[];

        /**
         * 删除时的方法
         * @example
         * onRemove = async (row,action) => {
         *      const res = await request('/apipath');
         *      action?.reload();
         * }
         */
        onRemove?: (row: Record<any, any>, action?: ActionType) => Promise<void>;

        /**
         * 删除时的提醒
         * @example
         * removePopconfirmTitle = （row) => {
         *    return `你确定要删除 ID 为 ${row.id} 的数据吗？`;
         * }
         */
        removePopconfirmTitle?: (row: Record<any, any>) => string;

        /**
         * 表格生成时的 loading 组件，若不喜欢自带的 loadign 全屏组件,可以通过此组件自定义
         */
        customTableLoadingSpinNode?: JSX.Element;

        /**
         * 自定义编辑文字
         */
        customUpdateText?: string;
    };

```
