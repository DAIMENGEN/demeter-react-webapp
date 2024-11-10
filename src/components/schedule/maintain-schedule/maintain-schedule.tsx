import "./maintain-schedule.scss";
import React, {useState} from "react";
import {EditableProTable} from "@ant-design/pro-table";
import {Button} from "antd";
import {
    defaultTableRowData,
    MaintainScheduleTableRow
} from "@D/components/schedule/maintain-schedule/maintain-schedule-helper";
import {
    useMaintainScheduleTableColumns
} from "@D/components/schedule/maintain-schedule/hooks/use-maintain-schedule-table-columns";
import {useAddTaskViaShortcut} from "@D/components/schedule/maintain-schedule/hooks/use-add-task-via-shortcut";

export const MaintainSchedule = () => {
    const [dataSource, setDataSource] = useState<readonly MaintainScheduleTableRow[]>([]);
    const [editableKeys, setEditableRowKeys] = useState<Array<React.Key>>(dataSource.map((item) => item.id));
    const {actionRef, tableRef, expandedRowKeys, setExpandedRowKeys, setParentKey, parentKey} = useAddTaskViaShortcut();
    return (
        <div ref={tableRef}>
            <EditableProTable<MaintainScheduleTableRow>
                actionRef={actionRef}
                headerTitle="Maintain Schedule Task"
                columns={useMaintainScheduleTableColumns()}
                rowKey="id"
                scroll={{x: 1500}}
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
                    type: 'radio',
                    onChange: (selectedRowKeys, _) => {
                        console.log('selectedRowKeys changed:', selectedRowKeys)
                        setParentKey(selectedRowKeys[0] as string);
                    }
                }}
                recordCreatorProps={{
                    icon: false,
                    position: 'bottom',
                    newRecordType: 'dataSource',
                    parentKey: parentKey,
                    creatorButtonText: "Add Task",
                    onClick: () => parentKey! && setExpandedRowKeys(keys => [...keys, parentKey]),
                    record: () => (defaultTableRowData(parentKey)),
                }}
                toolBarRender={() => {
                    return [
                        <Button type="primary" key="save"
                                onClick={() => {
                                    // dataSource 就是当前数据，可以调用 api 将其保存
                                    console.log(dataSource);
                                }}>
                            save
                        </Button>,
                    ];
                }}
                editable={{
                    type: 'multiple',
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