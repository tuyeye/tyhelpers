import React, { useState, useImperativeHandle, useMemo } from 'react';
import {
    BetaSchemaForm, ActionType, DrawerForm, ProForm,
    ProFormProps, ProFormColumnsType, FormInstance,
} from '@ant-design/pro-components';
import utils from './utils';

const _stringToProps = utils.stringToProps;

export declare type JsonProTableUpdateProps<T, ValueType> = {
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

    //以下是组件内部调用
    tableAction?: ActionType;
    updateRef?: any;
    updateRow?: Record<any, T>;
};

export declare type JsonProTableUpdateType<T extends Record<string, any>, ValueType> = {
    setUpdateVis: (data: boolean) => void;
}

function JsonProTableUpdate<T extends Record<string, any>, ValueType>(props: JsonProTableUpdateProps<T, ValueType>) {

    const [loading, setLoading] = useState<boolean>(false);

    const [updateProps, setUpdateProps] = useState<ProFormProps>({});
    const [updateColumns, setUpdateColumns] = useState<ProFormColumnsType<T, ValueType>[]>([]);
    const [updateVis, setUpdateVis] = useState<boolean>(false);
    const [form] = ProForm.useForm();

    useImperativeHandle(props.updateRef, () => ({ setUpdateVis }));

    const fetchData = async () => {
        setLoading(true);
        if (props.propsRequest) {
            const _props = await props.propsRequest(_stringToProps);
            setUpdateProps(_props);
        }
        if (props.columnsRequest) {
            const _columns = await props.columnsRequest(_stringToProps);

            const theColumns = _columns.map((e: any) => {
                const f = e;
                if (typeof e.dataIndex === "object" || typeof e.key === "object") {
                    f.dataIndex = e.dataIndex.id;
                    f.key = e.key.id;
                    return f;
                }
                return f;

            });

            setUpdateColumns(theColumns);
        }
        setLoading(false);
    }

    useMemo(() => {
        fetchData();
    }, [props.propsRequest, props.columnsRequest])

    if (loading || (!props.updateRow) || (!props.columnsRequest)) return <></>;

    return <DrawerForm
        title="编辑此行"
        width={500}
        {...updateProps}
        open={updateVis}
        onOpenChange={setUpdateVis}
        drawerProps={{ destroyOnClose: true }}
        onFinish={async (value) => {
            if (props.onUpdate && props.updateRow) {
                return await props.onUpdate(value, props.tableAction, props.updateRow);
            }
            return true;
        }}
        request={async () => {
            //very nice!!
            if (props.dataRequest && props.updateRow) {
                return props.dataRequest(props.updateRow);
            }
            return {};
        }}
    >
        {props.customFormItems && props.customFormItems(form)}
        <BetaSchemaForm<T, ValueType>
            columns={updateColumns}
            layoutType="Embed"
            shouldUpdate={false}
            omitNil={false}
            key="jsontableupdate"
        />
    </DrawerForm>
}

export default JsonProTableUpdate;