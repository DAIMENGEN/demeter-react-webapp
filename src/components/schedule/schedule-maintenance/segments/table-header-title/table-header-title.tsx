import React, {MutableRefObject} from "react";
import {Button, Flex} from "antd";
import {ActionType, ProColumns} from "@ant-design/pro-table";
import {DataSourceType} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";
import {
    TableColumnHide
} from "@D/components/schedule/schedule-maintenance/segments/table-column-hide/table-column-hide";
import {AddIcon01} from "@D/icons/add-icon/add-icon-01";
import {ScheduleMaintenanceUtils} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-utils";
import {useEmployeeId} from "@D/core/hooks/employee/use-employee-id";
import {AddTableColumn} from "@D/components/schedule/schedule-maintenance/segments/add-table-column/add-table-column";

export const TableHeaderTitle: React.FC<{
    actionRef: MutableRefObject<ActionType | undefined>;
    columns: ProColumns<DataSourceType>[];
    parentKey: string | undefined;
    addColumn: (column: ProColumns<DataSourceType>) => void;
    showColumn: (columnKey: React.Key) => void;
    hideColumn: (columnKey: React.Key) => void;
    updateColumn: (column: ProColumns<DataSourceType>) => void;
    copyTableRow: DataSourceType | undefined;
    displayColumns: React.Key[];
    setExpandedRowKeys: (value: React.SetStateAction<React.Key[]>) => void;
    isAllColumnsVisible: boolean,
}> = ({
          actionRef,
          columns,
          parentKey,
          addColumn,
          showColumn,
          hideColumn,
          updateColumn,
          copyTableRow,
          displayColumns,
          setExpandedRowKeys,
          isAllColumnsVisible
      }) => {
    const employeeId = useEmployeeId();

    return (
        <div className={"table-header-title"}>
            <Flex gap={15}>
                <Button type="primary"
                        iconPosition={"end"}
                        icon={<AddIcon01 width={16} height={16} color={"#fff"}/>}
                        onClick={() => {
                            actionRef.current?.addEditRecord(ScheduleMaintenanceUtils.createRecord(employeeId, parentKey, copyTableRow), {
                                parentKey: parentKey,
                                newRecordType: "dataSource",
                            });
                            if (parentKey) {
                                setExpandedRowKeys(keys => [...keys, parentKey])
                            }
                        }}>
                    Add task
                </Button>
                <TableColumnHide columns={columns}
                                 showColumn={showColumn}
                                 hideColumn={hideColumn}
                                 displayColumns={displayColumns}
                                 isAllColumnsVisible={isAllColumnsVisible}/>
                <AddTableColumn addColumn={addColumn} showColumn={showColumn} updateColumn={updateColumn}/>
            </Flex>
        </div>
    );
}