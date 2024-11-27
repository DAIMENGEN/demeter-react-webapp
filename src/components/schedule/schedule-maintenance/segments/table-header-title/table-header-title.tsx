import React, {MutableRefObject, useState} from "react";
import {Button, Flex, Popover} from "antd";
import {HideIcon01} from "@D/icons/hide-icon-01";
import {ActionType, ProColumns} from "@ant-design/pro-table";
import {MaintainScheduleTableRow} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";
import {
    TableColumnDisplay
} from "@D/components/schedule/schedule-maintenance/segments/table-column-display/table-column-display";
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
    const [hideBtnId, setHideBtnId] = useState<string | undefined>(undefined);

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
                <Popover title={"Display columns"}
                         trigger="click"
                         arrow={false}
                         onOpenChange={open => {
                             setHideBtnId(open ? "highlight-button" : undefined);
                         }}
                         placement="bottomLeft"
                         content={<TableColumnDisplay columns={columns}
                                                      showColumns={showColumns}
                                                      setShowColumns={setShowColumns}/>}>
                    <Button type="text"
                            id={hideBtnId}
                            icon={<HideIcon01 width={16} height={16} color={"#000000"}/>}>
                        Hide
                    </Button>
                </Popover>
            </Flex>
        </div>
    );
}