import "./schedule-maintenance.scss";
import {Button, Flex, Popconfirm, Popover, Tabs} from "antd";
import {useHtmlDivElementRef} from "@D/core/hooks/ref/use-html-div-element-ref.tsx";
import {MessageIcon01} from "@D/icons/message-icon/message-icon-01.tsx";
import {PeopleIcon01} from "@D/icons/people-icon/people-icon-01.tsx";
import {MoreIcon01} from "@D/icons/more-icon/more-icon-01.tsx";
import {HIGHLIGHT_COLOR, PRIMARY_COLOR} from "@D/core/style/theme.ts";
import {DownIcon01} from "@D/icons/down-icon/down-icon-01.tsx";
import {HouseIcon01} from "@D/icons/house-icon/house-icon-01.tsx";
import {GanttIcon01} from "@D/icons/gantt-icon/gantt-icon-01.tsx";
import React, {useRef, useState} from "react";
import {ActionType, EditableProTable} from "@ant-design/pro-table";
import {ProjectTaskPayload} from "@D/http/payload/project-task-payload.ts";
import {
    useScheduleMaintenanceTableScroll
} from "@D/components/schedule/schedule-maintenance/maintenance-table/use-schedule-maintenance-table-scroll.tsx";
import {
    useScheduleMaintenanceTableColumns
} from "@D/components/schedule/schedule-maintenance/maintenance-table/use-schedule-maintenance-table-columns.tsx";
import {SaveIcon01} from "@D/icons/save-icon/save-icon-01.tsx";
import {useAntdMessage} from "@D/core/hooks/message/use-antd-message.tsx";
import {CopyIcon01} from "@D/icons/copy-icon/copy-icon-01.tsx";
import {DeleteIcon01} from "@D/icons/delete-icon/delete-icon-01.tsx";
import {
    ScheduleMaintenanceTableHeaderTitle
} from "@D/components/schedule/schedule-maintenance/maintenance-table/schedule-maintenance-table-header-title.tsx";

export const ScheduleMaintenance = () => {
    const {contextHolderMessage, success} = useAntdMessage();
    const scheduleMaintenanceRef = useHtmlDivElementRef();
    const scheduleMaintenanceTableActionRef = useRef<ActionType>();
    const [highlightScheduleTitle, setHighlightScheduleTitle] = useState<boolean>();
    const {
        tableColumns,
        displayColumns,
        hiddenTableColumn,
        createTableColumn,
        updateTableColumn,
        displayTableColumn,
        isAllColumnsVisible,
        createTableColumnMessage
    } = useScheduleMaintenanceTableColumns("0");
    const [dataSource, setDataSource] = useState<readonly ProjectTaskPayload[]>([]);
    const [copyTableRowData, setCopyTableRowData] = useState<ProjectTaskPayload>();
    const [expandedRowKeys, setExpandedRowKeys] = useState<React.Key[]>([]);
    const [parentKey, setParentKey] = useState<string | undefined>(undefined);
    const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(dataSource.map((item) => item.id));
    return (
        <div className={"schedule-maintenance"} ref={scheduleMaintenanceRef}>
            <span>{contextHolderMessage}</span>
            <span>{createTableColumnMessage}</span>
            <div className={"schedule-maintenance-header"}>
                <Flex justify={"space-between"}>
                    <Popover title={"ScheduleTitle"}
                             trigger="click"
                             arrow={false}
                             placement="bottomLeft"
                             onOpenChange={setHighlightScheduleTitle}>
                        <Button type={"text"}
                                iconPosition={"end"}
                                style={{backgroundColor: highlightScheduleTitle ? HIGHLIGHT_COLOR : ""}}
                                icon={<DownIcon01 width={15} height={15} color={"#000000"}/>}>
                            <span style={{fontSize: 25, fontWeight: "normal"}}>CardTitle</span>
                        </Button>
                    </Popover>
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
                <div className={"main-table"}>
                    <EditableProTable<ProjectTaskPayload>
                        rowKey="id"
                        value={dataSource}
                        columns={displayColumns}
                        recordCreatorProps={false}
                        scroll={useScheduleMaintenanceTableScroll()}
                        actionRef={scheduleMaintenanceTableActionRef}
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
                                setParentKey(selectedRowKeys[0] as string);
                            }
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
                            actionRender: (row) => {
                                return [
                                    <Button key={"copy"}
                                            title={"Copy"}
                                            icon={<CopyIcon01 width={20} height={20} color={PRIMARY_COLOR}/>}
                                            onClick={() => {
                                                setCopyTableRowData(row)
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
                                setDataSource(recordList);
                                if (!record && copyTableRowData) {
                                    setCopyTableRowData(undefined);
                                    success("Paste Successfully", 0.5).then();
                                }
                            },
                            onChange: setEditableRowKeys,
                        }}
                        headerTitle={<ScheduleMaintenanceTableHeaderTitle
                            parentKey={parentKey}
                            tableColumns={tableColumns}
                            displayColumns={displayColumns}
                            copyTableRowData={copyTableRowData}
                            createTableColumn={createTableColumn}
                            updateTableColumn={updateTableColumn}
                            hiddenTableColumn={hiddenTableColumn}
                            displayTableColumn={displayTableColumn}
                            isAllColumnsVisible={isAllColumnsVisible}
                            setExpandedRowKeys={setExpandedRowKeys}
                            tableActionRef={scheduleMaintenanceTableActionRef}
                        />}
                    />
                </div>
                <div className={"main-gantt"}>

                </div>
            </div>
        </div>
    )
}