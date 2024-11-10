import React, {useEffect, useRef, useState} from "react";
import {ActionType} from "@ant-design/pro-table";
import {defaultTableRowData} from "@D/components/schedule/maintain-schedule/maintain-schedule-helper";

export const useAddTaskViaShortcut = () => {
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
                    actionRef.current?.addEditRecord(defaultTableRowData(parentKey), {
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
    }, [parentKey]);
    return {actionRef, tableRef, parentKey, expandedRowKeys, setParentKey, setExpandedRowKeys};
}