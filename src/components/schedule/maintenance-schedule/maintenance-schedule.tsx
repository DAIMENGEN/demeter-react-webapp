import "./maintenance-schedule.scss";
import React, {useState} from "react";
import {EditableProTable} from "@ant-design/pro-table";
import {Button, Checkbox, Flex, Popover} from "antd";
import {
    createDefaultRecord,
    MaintainScheduleTableRow
} from "@D/components/schedule/maintenance-schedule/maintenance-schedule-helper";
import {
    useMaintenanceScheduleTableConfigs
} from "@D/components/schedule/maintenance-schedule/hooks/use-maintenance-schedule-table-configs";
import {useAddTaskViaShortcut} from "@D/components/schedule/maintenance-schedule/hooks/use-add-task-via-shortcut";
import {
    useMaintenanceScheduleTableScroll
} from "@D/components/schedule/maintenance-schedule/hooks/use-maintenance-schedule-table-scroll";
import {SaveIcon01} from "@D/icons/save-icon-01";
import {ColumnIcon01} from "@D/icons/column-icon-01";
import {useEmployeeId} from "@D/core/hooks/employee/use-employee-id";

export const MaintenanceSchedule = () => {
    const employeeId = useEmployeeId();
    const scroll = useMaintenanceScheduleTableScroll();
    const {columns, showColumns, setShowColumns} = useMaintenanceScheduleTableConfigs();
    const [dataSource, setDataSource] = useState<readonly MaintainScheduleTableRow[]>([]);
    const [editableKeys, setEditableRowKeys] = useState<Array<React.Key>>(dataSource.map((item) => item.id));
    const {actionRef, tableRef, expandedRowKeys, setExpandedRowKeys, setParentKey, parentKey} = useAddTaskViaShortcut();

    return (
        <div ref={tableRef}>
            <EditableProTable<MaintainScheduleTableRow>
                actionRef={actionRef}
                headerTitle="Maintain Schedule Task"
                columns={columns}
                rowKey="id"
                scroll={scroll}
                value={dataSource}
                onChange={setDataSource}
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
                    record: () => createDefaultRecord(employeeId, parentKey),
                }}
                toolBarRender={() => {
                    return [
                        <Popover title={"Column"}
                                 trigger="click"
                                 placement="leftTop"
                                 content={<Checkbox.Group style={{width: "100%"}}
                                                          defaultValue={showColumns}
                                                          onChange={(checkedValues) => setShowColumns(checkedValues)}>
                                     <Flex vertical={true} gap={"small"}>
                                         {
                                             columns.map(column =>
                                                 <Checkbox key={column.key}
                                                           value={column.key}>{column.title as string}</Checkbox>)
                                         }
                                     </Flex>
                                 </Checkbox.Group>}>
                            <Button key="column"
                                    type="primary"
                                    icon={<ColumnIcon01 width={20} height={20} color={"#fff"}/>}/>
                        </Popover>,
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
                    actionRender: (row, config, defaultDomes) => {
                        return [defaultDomes.delete];
                    },
                    onValuesChange: (record, recordList) => {
                        setDataSource(recordList);
                    },
                    onChange: setEditableRowKeys,
                }}
            />
        </div>
    );
}