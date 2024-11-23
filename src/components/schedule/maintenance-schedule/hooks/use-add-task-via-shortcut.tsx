import React, {useEffect, useRef, useState} from "react";
import {ActionType} from "@ant-design/pro-table";
import {useEmployeeId} from "@D/core/hooks/employee/use-employee-id";
import {MaintenanceScheduleUtils} from "@D/components/schedule/maintenance-schedule/maintenance-schedule-utils";

export const useAddTaskViaShortcut = () => {
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
                    actionRef.current?.addEditRecord(MaintenanceScheduleUtils.createDefaultRecord(employeeId, parentKey), {
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
    }, [employeeId, parentKey]);
    return {actionRef, tableRef, parentKey, expandedRowKeys, setParentKey, setExpandedRowKeys};
}