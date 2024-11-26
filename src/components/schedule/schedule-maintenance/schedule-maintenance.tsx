import "./schedule-maintenance.scss";
import React, {useState} from "react";
import {EditableProTable} from "@ant-design/pro-table";
import {Button, Popconfirm} from "antd";
import {
    useMaintenanceScheduleTableConfigs
} from "@D/components/schedule/schedule-maintenance/hooks/use-maintenance-schedule-table-configs";
import {useAddTaskViaShortcut} from "@D/components/schedule/schedule-maintenance/hooks/use-add-task-via-shortcut";
import {
    useMaintenanceScheduleTableScroll
} from "@D/components/schedule/schedule-maintenance/hooks/use-maintenance-schedule-table-scroll";
import {SaveIcon01} from "@D/icons/save-icon-01";
import {useEmployeeId} from "@D/core/hooks/employee/use-employee-id";
import {MaintainScheduleTableRow} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";
import {ScheduleMaintenanceUtils} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-utils";
import {DeleteIcon01} from "@D/icons/delete-icon-01";
import {PRIMARY_COLOR} from "@D/core/style/theme";
import {CopyIcon01} from "@D/icons/copy-icon-01";
import {useAntdMessage} from "@D/core/hooks/message/use-antd-message";
import {
    TableHeaderTitle
} from "@D/components/schedule/schedule-maintenance/segments/table-header-title/table-header-title";

export const ScheduleMaintenance = () => {
    const employeeId = useEmployeeId();
    const {contextHolderMessage, success} = useAntdMessage();
    const scroll = useMaintenanceScheduleTableScroll();
    const {columns, showColumns, setShowColumns} = useMaintenanceScheduleTableConfigs();
    const [copyTableRow, setCopyTableRow] = useState<MaintainScheduleTableRow>();
    const [dataSource, setDataSource] = useState<readonly MaintainScheduleTableRow[]>([]);
    const [editableKeys, setEditableRowKeys] = useState<Array<React.Key>>(dataSource.map((item) => item.id));
    const {
        actionRef,
        tableRef,
        expandedRowKeys,
        setExpandedRowKeys,
        setParentKey,
        parentKey
    } = useAddTaskViaShortcut(copyTableRow);

    return (
        <div ref={tableRef}>
            {contextHolderMessage}
            <EditableProTable<MaintainScheduleTableRow>
                actionRef={actionRef}
                headerTitle={<TableHeaderTitle columns={columns} showColumns={showColumns}
                                               setShowColumns={setShowColumns}/>}
                columns={columns}
                rowKey="id"
                scroll={scroll}
                value={dataSource}
                expandable={{
                    defaultExpandAllRows: true,
                    expandedRowKeys: expandedRowKeys,
                    onExpandedRowsChange: (expandedRowKeys) => {
                        setExpandedRowKeys([...expandedRowKeys]);
                    }
                }}
                rowSelection={{
                    type: "radio",
                    onChange: (selectedRowKeys, _) => {
                        console.log('selectedRowKeys changed:', selectedRowKeys)
                        setParentKey(selectedRowKeys[0] as string);
                    }
                }}
                recordCreatorProps={{
                    icon: false,
                    position: "bottom",
                    newRecordType: "dataSource",
                    parentKey: parentKey,
                    creatorButtonText: "Add Task",
                    onClick: () => parentKey! && setExpandedRowKeys(keys => [...keys, parentKey]),
                    record: () => ScheduleMaintenanceUtils.createRecord(employeeId, parentKey, copyTableRow),
                }}
                toolBarRender={() => {
                    return [
                        <Button key="save"
                                type="primary"
                                icon={<SaveIcon01 width={20} height={20} color={"#fff"}/>}
                                onClick={() => {
                                    // dataSource 就是当前数据，可以调用 api 将其保存
                                    console.log(dataSource);
                                }}/>,
                    ];
                }}
                editable={{
                    type: "multiple",
                    editableKeys,
                    actionRender: (row, config) => {
                        return [
                            <Button key={"copy"}
                                    title={"Copy"}
                                    icon={<CopyIcon01 width={20} height={20} color={PRIMARY_COLOR}/>}
                                    onClick={() => {
                                        setCopyTableRow(row)
                                        success("Copy Successfully", 0.5).then();
                                    }}/>,
                            <Popconfirm key={"delete"}
                                        placement={"left"}
                                        title={`Delete the ${row.name}`}
                                        description={"Are you sure to delete this row?"}
                                        okText={"Yes"}
                                        cancelText={"No"}
                                        onConfirm={() => setDataSource(dataSource.filter(item => item.id !== row.id))}>
                                <Button title={"Delete"}
                                        icon={<DeleteIcon01 width={20} height={20} color={PRIMARY_COLOR}/>}/>
                            </Popconfirm>,
                        ];
                    },
                    onValuesChange: (record, recordList) => {
                        // console.log('record:', record, 'recordList:', recordList);
                        setDataSource(recordList);
                        if (!record && copyTableRow) {
                            setCopyTableRow(undefined);
                            success("Paste Successfully", 0.5).then();
                        }
                    },
                    onChange: setEditableRowKeys,
                }}
            />
        </div>
    );
}