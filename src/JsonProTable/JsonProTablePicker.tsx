import { ProTableProps, ProColumns } from '@ant-design/pro-components';
import { Modal } from 'antd';
import { useState } from 'react';
import JsonProTable from './JsonProTable';
import ContentLoading from './ContentLoading';

export declare type JsonProTablePicker<T, U, ValueType> = {
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

    tableAlertOptionRender: (selectedRowKeys: any[], selectedRows: T[], closeModal: () => void) => JSX.Element;

    rowKey: string;
    /** 触发器 */
    trigger?: JSX.Element;

    headerTitle?: string;

    request?: (params: any) => Promise<{ total: number, data: any[] }>;

    params?: object;


};

function Page<T extends Record<string, any>, U, ValueType>(props: JsonProTablePicker<T, U, ValueType>) {

    const [visible, setVisible] = useState<boolean>(false);
    return <>
        <div onClick={() => { setVisible(true) }}>
            {props.trigger ?? <a>选择</a>}
        </div>
        <Modal
            title={props.headerTitle}
            onCancel={() => setVisible(false)}
            visible={visible}
            width={1200}
            bodyStyle={{
                padding: 0, minHeight: 650, overflow: "hidden"
            }}
            destroyOnClose
            style={{ top: 30 }}
            footer={false}
        >
            <JsonProTable
                rowKey={props.rowKey}
                bordered
                JsonProTableProps={{
                    propsRequest: props?.propsRequest as any,
                    columnsRequest: props?.columnsRequest as any,
                    customTableLoadingSpinNode: <ContentLoading tip="表格生成中，请稍候片刻" height={600} />
                }}

                scroll={{ x: 1300, y: 300 }}
                pagination={{ showSizeChanger: true }}
                request={props.request}
                params={props.params}
                rowSelection={{}}
                tableAlertOptionRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => {
                    return props.tableAlertOptionRender(selectedRowKeys, selectedRows, () => { setVisible(false) });
                }}
                options={false}
            />
        </Modal>

    </>;
}

export default Page;