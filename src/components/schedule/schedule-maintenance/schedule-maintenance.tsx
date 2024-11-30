import "./schedule-maintenance.scss";
import React, {useEffect, useRef, useState} from "react";
import {ActionType, EditableProTable} from "@ant-design/pro-table";
import {Button, Flex, Popconfirm, Tabs} from "antd";
import {useTableConfigs} from "@D/components/schedule/schedule-maintenance/hooks/use-table-configs";
import {useTableScroll} from "@D/components/schedule/schedule-maintenance/hooks/use-table-scroll";
import {SaveIcon01} from "@D/icons/save-icon/save-icon-01";
import {useEmployeeId} from "@D/core/hooks/employee/use-employee-id";
import {MaintainScheduleTableRow} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";
import {ScheduleMaintenanceUtils} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-utils";
import {DeleteIcon01} from "@D/icons/delete-icon/delete-icon-01";
import {PRIMARY_COLOR} from "@D/core/style/theme";
import {CopyIcon01} from "@D/icons/copy-icon/copy-icon-01";
import {useAntdMessage} from "@D/core/hooks/message/use-antd-message";
import {
    TableHeaderTitle
} from "@D/components/schedule/schedule-maintenance/segments/table-header-title/table-header-title";
import {ScheduleTitle} from "@D/components/schedule/schedule-maintenance/segments/schedule-title/schedule-title";
import {HouseIcon01} from "@D/icons/house-icon/house-icon-01";
import {GanttIcon01} from "@D/icons/gantt-icon/gantt-icon-01";
import {MoreIcon01} from "@D/icons/more-icon/more-icon-01";
import {PeopleIcon01} from "@D/icons/people-icon/people-icon-01";
import {MessageIcon01} from "@D/icons/message-icon/message-icon-01";

export const ScheduleMaintenance = () => {
    const employeeId = useEmployeeId();
    const {contextHolderMessage, success} = useAntdMessage();
    const actionRef = useRef<ActionType>();
    const tableRef = useRef<HTMLDivElement>(null);
    const [parentKey, setParentKey] = useState<string | undefined>(undefined);
    const [expandedRowKeys, setExpandedRowKeys] = useState<Array<React.Key>>([]);
    const {columns, showColumns, setShowColumns} = useTableConfigs();
    const [copyTableRow, setCopyTableRow] = useState<MaintainScheduleTableRow>();
    const [dataSource, setDataSource] = useState<readonly MaintainScheduleTableRow[]>([]);
    const [editableKeys, setEditableRowKeys] = useState<Array<React.Key>>(dataSource.map((item) => item.id));

    // shortcut: ctrl + d
    useEffect(() => {
        const current = tableRef.current;
        if (current) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.ctrlKey && event.key === "d") {
                    event.preventDefault();
                    event.stopPropagation();
                    actionRef.current?.addEditRecord(ScheduleMaintenanceUtils.createRecord(employeeId, parentKey, copyTableRow), {
                        parentKey: parentKey,
                        newRecordType: "dataSource",
                    });
                    if (parentKey) {
                        setExpandedRowKeys(keys => [...keys, parentKey])
                    }
                }
            };
            window.addEventListener("keydown", handleKeyDown);
            return () => {
                window.removeEventListener("keydown", handleKeyDown);
            };
        }
    }, [tableRef, actionRef, copyTableRow, employeeId, parentKey]);

    return (
        <div ref={tableRef} style={{backgroundColor: "#ffffff"}} className={"schedule-maintenance"}>
            {contextHolderMessage}
            <div className={"schedule-maintenance-title"}>
                <Flex justify={"space-between"}>
                    <ScheduleTitle/>
                    <Flex gap={10} justify={"flex-end"} style={{paddingRight: 10}}>
                        <Button type={"text"} icon={<MessageIcon01 width={20} height={20} color={"#000000"}/>}/>
                        <Button type={"text"} icon={<PeopleIcon01 width={20} height={20} color={"#000000"}/>}/>
                        <Button type={"text"} icon={<MoreIcon01 width={20} height={20} color={"#000000"}/>}/>
                    </Flex>
                </Flex>
                <Tabs items={[
                    {
                        key: "main-table",
                        label: <Button type={"text"} icon={<HouseIcon01 width={15} height={15} color={"#000000"}/>}>Main
                            Table</Button>,
                    },
                    {
                        key: "main-gantt",
                        label: <Button type={"text"} icon={<GanttIcon01 width={15} height={15} color={"#000000"}/>}>Main
                            Gantt</Button>,
                    }
                ]} tabBarGutter={0}/>
            </div>
            <div className={"schedule-maintenance-body"}>
                <EditableProTable<MaintainScheduleTableRow>
                    rowKey="id"
                    actionRef={actionRef}
                    headerTitle={<TableHeaderTitle actionRef={actionRef}
                                                   columns={columns}
                                                   parentKey={parentKey}
                                                   copyTableRow={copyTableRow}
                                                   showColumns={showColumns}
                                                   setShowColumns={setShowColumns}
                                                   setExpandedRowKeys={setExpandedRowKeys}/>}
                    columns={columns}
                    scroll={useTableScroll()}
                    value={dataSource}
                    expandable={{
                        defaultExpandAllRows: true,
                        expandedRowKeys: expandedRowKeys,
                        onExpandedRowsChange: (expandedRowKeys) => {
                            setExpandedRowKeys([...expandedRowKeys]);
                        }
                    }}
                    rowSelection={dataSource.length > 0 && {
                        type: "radio",
                        onChange: (selectedRowKeys) => {
                            console.log('selectedRowKeys changed:', selectedRowKeys)
                            setParentKey(selectedRowKeys[0] as string);
                        }
                    }}
                    recordCreatorProps={false}
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
                        actionRender: (row) => {
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
        </div>
    );
}