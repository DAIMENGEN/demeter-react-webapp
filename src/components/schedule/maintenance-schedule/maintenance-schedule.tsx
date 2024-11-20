import "./maintenance-schedule.scss";
import React, {useState} from "react";
import {EditableProTable} from "@ant-design/pro-table";
import {Button} from "antd";
import {
    defaultTableRowData,
    MaintainScheduleTableRow
} from "@D/components/schedule/maintenance-schedule/maintenance-schedule-helper";
import {
    useMaintenanceScheduleTableColumns
} from "@D/components/schedule/maintenance-schedule/hooks/use-maintenance-schedule-table-columns";
import {useAddTaskViaShortcut} from "@D/components/schedule/maintenance-schedule/hooks/use-add-task-via-shortcut";
import {
    useMaintenanceScheduleTableScroll
} from "@D/components/schedule/maintenance-schedule/hooks/use-maintenance-schedule-table-scroll";
import {SaveIcon01} from "@D/common/icons/save-icon-01";
import {ColumnIcon01} from "@D/common/icons/column-icon-01";

export const MaintenanceSchedule = () => {
    const scroll = useMaintenanceScheduleTableScroll();
    const [dataSource, setDataSource] = useState<readonly MaintainScheduleTableRow[]>([]);
    const [editableKeys, setEditableRowKeys] = useState<Array<React.Key>>(dataSource.map((item) => item.id));
    const {actionRef, tableRef, expandedRowKeys, setExpandedRowKeys, setParentKey, parentKey} = useAddTaskViaShortcut();
    return (
        <div ref={tableRef}>
            <EditableProTable<MaintainScheduleTableRow>
                actionRef={actionRef}
                headerTitle="Maintain Schedule Task"
                columns={useMaintenanceScheduleTableColumns()}
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
                    record: () => (defaultTableRowData(parentKey)),
                }}
                toolBarRender={() => {
                    return [
                        <Button key="column"
                                type="primary"
                                icon={<ColumnIcon01 width={20} height={20} color={"#fff"}/>}
                                onClick={() => {
                                    // column
                                    console.log("column display");
                                }}
                        />,
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