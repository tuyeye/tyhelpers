import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  BetaSchemaForm,
  DragSortTable,
  DrawerForm,
  ProCard,
  ProColumns,
  ProForm,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Modal } from 'antd';
import React, { FC, useRef, useState } from 'react';
import BackDrop from '../BackDrop';

/** FormItem 数据结构 */
declare type JsonFormItemDataSourceType = {
  idFormItem: number;
  key: string;
  dataIndex: string;
  valueType?: string;
  title?: string;
  tooltip?: string;
  valueEnum?: string;
  fieldProps?: string;
  formItemProps?: string;
  renderFormItem?: string;
  dependencies?: string;
  columns?: string;
  colProps?: string;
  hideInDescriptions?: string;
  hideInForm?: string;
  hideInTable?: string;
  hideInSearch?: string;
  request?: string;
  params?: string;
  proFieldProps?: string;
  renderText?: string;
  render?: string;
  rowProps?: string;
  convertValue?: string;
  initialValue?: string;
  transform?: string;
  width?: number;
};

export declare type JsonFormItemEditerProps = {
  /** 表格 rowKey */
  rowKey: string;

  /**
   * 获取表格的方法
   * @see 注意：不分页
   */
  dataRequest: () => Promise<{ data: JsonFormItemDataSourceType[] }>;

  /**
   * 获取查询所有 formitem 的方法，用于从其他 form 中复制 formitem
   * @example 注意：需要分页，返回
   * const data = { data:[],total:0 };
   */
  searchDataRequest: (
    params: any,
  ) => Promise<{ data: JsonFormItemDataSourceType[]; total: number }>;

  /**
   * 创建一行空数据，需要返回 true 或 false
   */
  postRequest: () => Promise<boolean>;

  /**
   * 删除数据，批量删除，需要返回 true 或 false
   * @param rows 行数组
   */
  deleteRequest: (rows: any[]) => Promise<boolean>;

  /**
   * 拖拽排序，需要返回 true 或 false，建议后端批量更新
   * @param newList 排序好的行数组
   */
  changeIndexRequest: (
    newList: JsonFormItemDataSourceType[],
  ) => Promise<boolean>;

  /**
   * 复制其他 form 的 item 的方法，需要返回 true 或 false，建议后端批量新增
   * @param list 选好的行数据
   */
  copyItemRequest: (list: JsonFormItemDataSourceType[]) => Promise<boolean>;

  /**
   * 更新所选行的数据，需要返回 true 或 false
   * @param data form 表单数据
   * @param row 所选行的数据
   */
  updateRequest: (
    data: JsonFormItemDataSourceType,
    row: JsonFormItemDataSourceType,
  ) => Promise<boolean>;
};

const JsonFormItemEditer: FC<JsonFormItemEditerProps> = (props) => {
  const {
    dataRequest,
    postRequest,
    deleteRequest,
    changeIndexRequest,
    copyItemRequest,
    searchDataRequest,
    updateRequest,
  } = props;

  const ref = useRef<ActionType>();
  const [moreVisible, setMoreVisible] = useState<boolean>(false);
  const [moreKey, setMoreKey] = useState<any>();
  const [searchVis, setSearchVis] = useState<boolean>(false);
  const [form] = ProForm.useForm();

  /** columns 数据 */
  const columns: ProColumns<JsonFormItemDataSourceType>[] = [
    {
      dataIndex: 'sort',
      width: 20,
      editable: false,
      hideInForm: true,
    },
    {
      dataIndex: 'idFormItem',
      hideInTable: true,
      readonly: true,
      title: 'item ID',
    },
    {
      dataIndex: 'idForm',
      hideInTable: true,
      readonly: true,
      title: 'Form ID',
    },
    {
      dataIndex: 'createTime',
      hideInTable: true,
      readonly: true,
      title: '创建时间',
    },
    {
      title: '序号',
      dataIndex: 'itemIndex',
      editable: false,
      width: 50,
      readonly: true,
      onHeaderCell: () => ({ style: { textAlign: 'center' } }),
      onCell: () => ({ style: { textAlign: 'center' } }),
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      formItemProps: {
        rules: [{ required: true, message: '此项必填' }],
      },
    },
    {
      title: 'Key',
      dataIndex: 'key',
      valueType: 'text',
      formItemProps: {
        rules: [{ required: true, message: '此项必填' }],
      },
    },
    {
      title: 'dataIndex',
      dataIndex: 'dataIndex',
      key: 'dataIndex',
      valueType: 'text',
      formItemProps: {
        rules: [{ required: true, message: '此项必填' }],
      },
    },
    {
      title: 'valueType',
      dataIndex: 'valueType',
      key: 'valueType',
    },
    {
      title: 'width',
      dataIndex: 'width',
      key: 'width',
    },

    {
      title: 'tooltip',
      dataIndex: 'tooltip',
      key: 'tooltip',
      hideInTable: true,
    },
    {
      title: 'valueEnum',
      dataIndex: 'valueEnum',
      key: 'valueEnum',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: 'fieldProps',
      dataIndex: 'fieldProps',
      key: 'fieldProps',
      hideInTable: true,
    },
    {
      title: 'formItemProps',
      dataIndex: 'formItemProps',
      key: 'formItemProps',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: 'renderFormItem',
      dataIndex: 'renderFormItem',
      key: 'renderFormItem',
      hideInTable: true,
    },
    {
      title: 'dependencies',
      dataIndex: 'dependencies',
      key: 'dependencies',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: 'columns',
      dataIndex: 'columns',
      key: 'columns',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: 'colProps',
      dataIndex: 'colProps',
      key: 'colProps',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: 'hideInDescriptions',
      dataIndex: 'hideInDescriptions',
      key: 'hideInDescriptions',
      valueType: 'switch',
      hideInTable: true,
    },
    {
      title: 'hideInForm',
      dataIndex: 'hideInForm',
      key: 'hideInForm',
      valueType: 'switch',
      hideInTable: true,
    },
    {
      title: 'hideInTable',
      dataIndex: 'hideInTable',
      key: 'hideInTable',
      valueType: 'switch',
      hideInTable: true,
    },
    {
      title: 'hideInSearch',
      dataIndex: 'hideInSearch',
      key: 'hideInSearch',
      valueType: 'switch',
      hideInTable: true,
    },
    {
      title: 'request',
      dataIndex: 'request',
      key: 'request',
      hideInTable: true,
    },
    {
      title: 'params',
      dataIndex: 'params',
      key: 'params',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: 'proFieldProps',
      dataIndex: 'proFieldProps',
      key: 'proFieldProps',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: 'renderText',
      dataIndex: 'renderText',
      key: 'renderText',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: 'render',
      dataIndex: 'render',
      key: 'render',
      hideInTable: true,
    },
    {
      title: 'rowProps',
      dataIndex: 'rowProps',
      key: 'rowProps',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: 'convertValue',
      dataIndex: 'convertValue',
      key: 'convertValue',
      valueType: 'jsonCode',
      hideInTable: true,
    },
    {
      title: 'initialValue',
      dataIndex: 'initialValue',
      key: 'initialValue',
      hideInTable: true,
    },
    {
      title: 'transform',
      dataIndex: 'transform',
      key: 'transform',
      hideInTable: true,
    },
    {
      title: 'readonly',
      dataIndex: 'readonly',
      key: 'readonly',
      hideInTable: true,
      valueType: 'switch',
    },
    {
      title: '操作',
      valueType: 'option',
      editable: false,
      // fixed: "right",
      hideInForm: true,
      width: 150,
      onHeaderCell: () => ({ style: { textAlign: 'center' } }),
      onCell: () => ({ style: { textAlign: 'center' } }),
      render: (_, record) => [
        <a
          key="editable"
          onClick={() => {
            setMoreKey(record);
            form.setFieldsValue(record);
            setMoreVisible(true);
          }}
        >
          编辑更多
        </a>,
        <a
          key="delete"
          onClick={async () => {
            const res = await BackDrop.promise('删除中', async () => {
              return await deleteRequest([record]);
            });
            if (res === true) {
              message.success('删除成功');
              ref.current?.reload();
            }
          }}
        >
          删除此行
        </a>,
      ],
    },
  ];

  const columns2: ProColumns<JsonFormItemDataSourceType>[] = [
    {
      dataIndex: 'formIdent',
      hideInTable: true,
      title: '表单标识',
    },
    {
      dataIndex: 'idForm',
      readonly: true,
      title: 'Form ID',
      search: false,
    },
    {
      dataIndex: 'idFormItem',
      readonly: true,
      title: 'item ID',
      search: false,
    },
    {
      dataIndex: 'createTime',
      readonly: true,
      title: '创建时间',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Key',
      dataIndex: 'key',
      valueType: 'text',
    },
    {
      title: 'dataIndex',
      dataIndex: 'dataIndex',
      key: 'dataIndex',
      valueType: 'text',
      search: false,
    },
    {
      title: 'valueType',
      dataIndex: 'valueType',
      key: 'valueType',
      search: false,
    },
  ];

  return (
    <ProCard
      title={`Item List`}
      extra={
        <a
          onClick={() => {
            setSearchVis(true);
          }}
        >
          从其他 form 中复制
        </a>
      }
    >
      <Modal
        visible={searchVis}
        onCancel={() => {
          setSearchVis(false);
        }}
        title="从其他 Form 中复制 Item"
        width={1200}
        footer={false}
        destroyOnClose
        bodyStyle={{ padding: 0 }}
      >
        <ProTable
          columns={columns2}
          request={async (params) => {
            return await searchDataRequest(params);
          }}
          rowKey={props.rowKey}
          options={false}
          bordered
          rowSelection={{}}
          pagination={{ showSizeChanger: true }}
          scroll={{ y: 300 }}
          tableAlertOptionRender={({ selectedRows }) => [
            <Button
              key="1"
              onClick={async () => {
                const res = await BackDrop.promise('处理中', async () => {
                  setSearchVis(false);
                  return await copyItemRequest(selectedRows);
                });
                if (res === true) {
                  message.success('复制成功');
                  ref.current?.reload();
                }
              }}
              type="link"
            >
              批量复制到此 Form 中
            </Button>,
          ]}
        />
      </Modal>
      <DrawerForm
        omitNil={false}
        form={form}
        title="编辑更多信息"
        visible={moreVisible}
        drawerProps={{
          onClose: () => setMoreVisible(false),
          destroyOnClose: true,
        }}
        width={500}
        onFinish={async (data) => {
          const res = await BackDrop.promise('处理中', async () => {
            return await updateRequest(data as any, moreKey);
          });
          if (res === true) {
            message.success('更新成功');
            ref.current?.reload();
            setMoreVisible(false);
          }
        }}
      >
        <BetaSchemaForm<JsonFormItemDataSourceType>
          columns={columns as any}
          layoutType="Embed"
        />
      </DrawerForm>

      <DragSortTable
        actionRef={ref}
        columns={columns}
        request={async () => {
          return await dataRequest();
        }}
        headerTitle={false}
        rowKey={props.rowKey}
        search={false}
        pagination={false}
        dragSortKey="sort"
        //scroll={{ x: 5000 }}
        cardProps={{ bodyStyle: { padding: 0 } }}
        rowSelection={{}}
        tableAlertOptionRender={({ onCleanSelected, selectedRows }) => [
          <Button
            icon={<DeleteOutlined />}
            onClick={async () => {
              const res = await BackDrop.promise('处理中', async () => {
                return await deleteRequest(selectedRows);
              });
              if (res === true) {
                message.success('删除成功');
                ref.current?.reload();
                onCleanSelected();
              }
            }}
            type="link"
            key="2"
          >
            批量删除
          </Button>,
        ]}
        options={false}
        bordered
        onDragSortEnd={async (newdata) => {
          const res = await BackDrop.promise('排序数据中', async () => {
            return await changeIndexRequest(newdata);
          });
          if (res === true) {
            message.success('排序成功');
            ref.current?.reload();
          }
        }}
      />
      <Button
        size="large"
        block
        type="dashed"
        icon={<PlusOutlined />}
        style={{ marginTop: 20 }}
        onClick={async () => {
          const res = await BackDrop.promise('创建数据中', async () => {
            return await postRequest();
          });
          if (res === true) {
            message.success('创建成功');
            ref.current?.reload();
          }
        }}
      >
        新增一行空白数据
      </Button>
    </ProCard>
  );
};

export default JsonFormItemEditer;
