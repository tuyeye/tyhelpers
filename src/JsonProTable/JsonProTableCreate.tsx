import React, { useState, useMemo } from 'react';
import {
    BetaSchemaForm, ActionType, ProForm, FormInstance,
    DrawerForm, ProFormProps, ProFormColumnsType
} from '@ant-design/pro-components';
import utils from './utils';
import { Tooltip, Spin } from 'antd';
import { LoadingOutlined, PlusCircleOutlined } from '@ant-design/icons';

const _stringToProps = utils.stringToProps;

export declare type JsonProTableCreateProps<T, ValueType> = {
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


    //以下是组件内部调用
    tableAction?: ActionType;
};

function JsonProTableCreate<T extends Record<string, any>, ValueType>(props: JsonProTableCreateProps<T, ValueType>) {

    const [loading, setLoading] = useState<boolean>(false);

    const [createProps, setCreateProps] = useState<ProFormProps>({});
    const [createColumns, setCreatColumns] = useState<ProFormColumnsType<T, ValueType>[]>([]);
    const [form] = ProForm.useForm();


    const fetchData = async () => {
        setLoading(true);
        if (props.propsRequest) {
            const _props = await props.propsRequest(_stringToProps);
            setCreateProps(_props);
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
            setCreatColumns(theColumns);
        }
        setLoading(false);
    }

    useMemo(() => {
        fetchData();
    }, [props.propsRequest, props.columnsRequest])

    if (!props.columnsRequest) return <></>;
    if (loading) return <Spin indicator={<LoadingOutlined spin />} />;

    return <DrawerForm
        title="新建"
        width={500}
        trigger={props.customCreateTrigger ?? <Tooltip title="新建">
            <PlusCircleOutlined className="ant-pro-table-list-toolbar-setting-item" />
        </Tooltip>}
        {...createProps}
        drawerProps={{ destroyOnClose: true }}
        onFinish={async (value) => {
            if (props.onCreate) {
                return await props.onCreate(value, props.tableAction);
            }
            return true;
        }}
    >
        {props.customFormItems && props.customFormItems(form)}
        <BetaSchemaForm<T, ValueType>
            columns={createColumns}
            layoutType="Embed"
            shouldUpdate={false}
            omitNil={false}
            key="jsontablecreate"
        />
    </DrawerForm>
}

export default JsonProTableCreate;