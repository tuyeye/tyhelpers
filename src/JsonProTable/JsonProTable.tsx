import {
  ActionType,
  FormInstance,
  ProColumns,
  ProFormColumnsType,
  ProFormProps,
  ProTable,
  ProTableProps,
} from '@ant-design/pro-components';
import type { ParamsType } from '@ant-design/pro-provider';
import { Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import BackDrop from '../BackDrop';
import JsonFormItemEditer from './JsonFormItemEditer';
import JsonProTableCreate from './JsonProTableCreate';
import JsonProTablePicker from './JsonProTablePicker';
import JsonProTableUpdate, {
  JsonProTableUpdateType,
} from './JsonProTableUpdate';

import utils from './utils';

const _stringToProps = utils.stringToProps;

export interface JsonProTableProps<T, U, ValueType>
  extends ProTableProps<T, U, ValueType> {
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
    propsRequest?: (
      stringToProps: (
        propsStr: string,
        objectEnum?:
          | {
              [name: string]: any;
            }
          | undefined,
        agreementChar?: string | undefined,
      ) => object,
    ) => Promise<ProFormProps>;

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
    columnsRequest?: (
      stringToProps: (
        propsStr: string,
        objectEnum?:
          | {
              [name: string]: any;
            }
          | undefined,
        agreementChar?: string | undefined,
      ) => object,
    ) => Promise<ProFormColumnsType<T, ValueType>[]>;

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
    onUpdate?: (
      value: any,
      action: ActionType | undefined,
      updateRow: Record<any, T>,
    ) => Promise<boolean>;

    /**
     * 若 json 字符串创建的 Form 表单不满足需求，可以通过此属性配置自定义表单项目
     * @see 提示：customFormItems 和 json 配置的表单互不影响，优先显示 customFormItems 的内容，再显示 json 生成的表单内容
     * @example
     * customFormItems = (form) => [<Form.Item key="i1"><div onClick={() => form.setFieldsValue({ test1: "1" })}>item1</div></Form.Item>];
     */
    customFormItems?: (form: FormInstance) => JSX.Element[];
  };
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
    propsRequest?: (
      stringToProps: (
        propsStr: string,
        objectEnum?:
          | {
              [name: string]: any;
            }
          | undefined,
        agreementChar?: string | undefined,
      ) => object,
    ) => Promise<ProFormProps>;

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
    columnsRequest?: (
      stringToProps: (
        propsStr: string,
        objectEnum?:
          | {
              [name: string]: any;
            }
          | undefined,
        agreementChar?: string | undefined,
      ) => object,
    ) => Promise<ProFormColumnsType<T, ValueType>[]>;

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
  //隔离出原生api
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
    propsRequest: (
      stringToProps: (
        propsStr: string,
        objectEnum?:
          | {
              [name: string]: any;
            }
          | undefined,
        agreementChar?: string | undefined,
      ) => object,
    ) => Promise<ProTableProps<T, U, ValueType>>;

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
    columnsRequest: (
      stringToProps: (
        propsStr: string,
        objectEnum?:
          | {
              [name: string]: any;
            }
          | undefined,
        agreementChar?: string | undefined,
      ) => object,
    ) => Promise<ProColumns<T, ValueType>[]>;

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
}

const JsonProTable = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>(
  props: JsonProTableProps<DataType, Params, ValueType>,
) => {
  const [tableProps, setTableProps] =
    useState<ProTableProps<DataType, Params, ValueType>>();
  const [columns, setColumns] = useState<ProColumns<DataType, ValueType>[]>();
  const [updateRow, setUpdateRow] = useState<Record<any, DataType>>();

  const tableRef = useRef<ActionType>();
  const updateRef = useRef<JsonProTableUpdateType>();

  function createOptionCell(_columns: ProColumns<DataType, ValueType>[]) {
    const _props = props.JsonProTableProps;

    if (_props) {
      const _columns0 = _columns.filter((p) => p.valueType !== 'option');

      //代表用户自定义的option
      const _columns1 = _columns.filter((p) => p.valueType === 'option');

      const _customOptions = _props.customOptions;

      const closeOptionCell =
        _columns1.length === 0 &&
        !_props.onRemove &&
        !props.JsonProTableUpdateProps &&
        !_customOptions;

      if (!closeOptionCell) {
        _columns0.push({
          onHeaderCell: () => ({
            style: { textAlign: 'center', minWidth: 150 },
          }),
          onCell: () => ({ style: { textAlign: 'center' } }),
          search: false,
          valueType: 'option',
          title: '操作',
          // fixed: "right",
          render: (text, row, index, action, f) => {
            const _userOptionNodes: JSX.Element[] = [];
            _columns1.map((e) => {
              if (e.render) {
                const theNode = e.render(
                  text,
                  row,
                  index,
                  action,
                  f,
                ) as JSX.Element[];
                _userOptionNodes.push(...theNode);
              }
              return true;
            });

            if (_customOptions) {
              _userOptionNodes.push(..._customOptions(row, action));
            }

            if (props.JsonProTableUpdateProps) {
              _userOptionNodes.push(
                <a
                  key="edit"
                  type="link"
                  onClick={() => {
                    Promise.resolve(setUpdateRow(row)).then(() => {
                      updateRef.current?.setUpdateVis(true);
                    });
                  }}
                >
                  {props.JsonProTableProps?.customUpdateText ?? '编辑'}
                </a>,
              );
            }

            if (_props.onRemove) {
              _userOptionNodes.push(
                <Popconfirm
                  placement="left"
                  key="delete"
                  title={
                    <>{_props.removePopconfirmTitle ?? '确定要删除吗？'}</>
                  }
                  onConfirm={async () => {
                    if (_props.onRemove) {
                      return await _props.onRemove(row, action);
                    }
                  }}
                >
                  <a style={{ color: 'red' }}>删除</a>
                </Popconfirm>,
              );
            }

            return _userOptionNodes;
          },
        });
      }
      setColumns(_columns0);
    }
  }

  useEffect(() => {
    const _tableProps = props.JsonProTableProps;

    //渲染表格
    if (_tableProps && !_tableProps.JsonProTableLoading) {
      Promise.resolve(_tableProps.propsRequest(_stringToProps)).then((res) => {
        const theProps = props;
        delete theProps.columns;

        setTableProps({ ...res, ...theProps });
      });
      Promise.resolve(
        _tableProps.columnsRequest(_stringToProps).then((res) => {
          const theColumns = res.map((e: any) => {
            const f = e;
            if (typeof e.dataIndex === 'object' || typeof e.key === 'object') {
              f.dataIndex = e.dataIndex.id;
              f.key = e.key.id;
              return f;
            }
            return f;
          });

          createOptionCell(theColumns);
        }),
      );
    }

    //渲染操作栏
  }, []);

  if (!(tableProps && columns) || props.JsonProTableProps?.JsonProTableLoading)
    return (
      props.JsonProTableProps?.customTableLoadingSpinNode ?? (
        <BackDrop open tip="表格生成中，请稍候片刻..." />
      )
    );
  return (
    <>
      <ProTable<DataType, Params, ValueType>
        actionRef={tableRef}
        {...tableProps}
        columns={columns}
        toolBarRender={
          !props.toolBarRender && !props.JsonProTableCreateProps
            ? props.toolBarRender === false
              ? false
              : () => []
            : (action, rows) => [
                ...(props.toolBarRender
                  ? props.toolBarRender(action, rows)
                  : []),
                ...(props.JsonProTableCreateProps
                  ? [
                      <JsonProTableCreate
                        key="create"
                        {...props.JsonProTableCreateProps}
                        tableAction={tableRef.current}
                      />,
                    ]
                  : []),
              ]
        }
      />
      <JsonProTableUpdate
        {...props.JsonProTableUpdateProps}
        updateRef={updateRef}
        updateRow={updateRow}
        tableAction={tableRef.current}
      />
    </>
  );
};

JsonProTable.JsonFormItemEditer = JsonFormItemEditer;
JsonProTable.JsonProTablePicker = JsonProTablePicker;

export default JsonProTable;
