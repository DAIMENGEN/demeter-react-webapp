import React, {useEffect, useRef, useState} from "react";
import {ActionType} from "@ant-design/pro-table";
import {useEmployeeId} from "@D/core/hooks/employee/use-employee-id";
import {ScheduleMaintenanceUtils} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-utils";
import {MaintainScheduleTableRow} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";

export const useAddTaskViaShortcut = (copyTableRow?: MaintainScheduleTableRow) => {
    const employeeId = useEmployeeId();
    const actionRef = useRef<ActionType>();
    const tableRef = useRef<HTMLDivElement>(null);
    const [parentKey, setParentKey] = useState<string | undefined>(undefined);
    const [expandedRowKeys, setExpandedRowKeys] = useState<Array<React.Key>>([]);
    useEffect(() => {
        const current = tableRef.current;
        if (current) {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.ctrlKey && event.key === 'd') {
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
    }, [copyTableRow, employeeId, parentKey]);
    return {actionRef, tableRef, parentKey, expandedRowKeys, setParentKey, setExpandedRowKeys};
}