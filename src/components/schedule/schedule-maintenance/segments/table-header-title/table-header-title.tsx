import React, {MutableRefObject} from "react";
import {Button, Flex} from "antd";
import {ActionType, ProColumns} from "@ant-design/pro-table";
import {MaintainScheduleTableRow} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";
import {
    TableColumnHide
} from "@D/components/schedule/schedule-maintenance/segments/table-column-hide/table-column-hide";
import {AddIcon01} from "@D/icons/add-icon-01";
import {ScheduleMaintenanceUtils} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-utils";
import {useEmployeeId} from "@D/core/hooks/employee/use-employee-id";

export const TableHeaderTitle: React.FC<{
    actionRef: MutableRefObject<ActionType | undefined>;
    parentKey: string | undefined;
    copyTableRow: MaintainScheduleTableRow | undefined;
    columns: Array<ProColumns<MaintainScheduleTableRow>>;
    showColumns: (React.Key | undefined)[];
    setShowColumns: React.Dispatch<React.SetStateAction<(React.Key | undefined)[]>>;
    setExpandedRowKeys: (value: React.SetStateAction<React.Key[]>) => void;
}> = ({actionRef, parentKey, copyTableRow, columns, showColumns, setShowColumns, setExpandedRowKeys}) => {
    const employeeId = useEmployeeId();

    return (
        <div className={"table-header-title"}>
            <Flex gap={20}>
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
                                 showColumns={showColumns}
                                 setShowColumns={setShowColumns}/>
            </Flex>
        </div>
    );
}