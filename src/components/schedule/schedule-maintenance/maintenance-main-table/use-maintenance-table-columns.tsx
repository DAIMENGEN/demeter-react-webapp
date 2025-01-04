import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ProjectTaskPayload} from "@D/http/payload/project-task-payload.ts";
import {ProColumns} from "@ant-design/pro-table";
import {ProjectTaskService} from "@D/http/service/project-task-service.ts";
import {JsonObject} from "@D/global-types";
import {useAntdMessage} from "@D/core/hooks/message/use-antd-message.tsx";

export const useMaintenanceTableColumns = (projectId: string) => {
    const projectTaskService = useMemo(() => ProjectTaskService.getInstance(), []);
    const {contextHolderMessage, failure} = useAntdMessage();
    const [tableColumns, setTableColumns] = useState<ProColumns<ProjectTaskPayload>[]>([]);
    const [displayColumns, setDisplayColumns] = useState<ProColumns<ProjectTaskPayload>[]>([]);
    const isAllColumnsVisible = useMemo(() => displayColumns.length === tableColumns.length, [tableColumns.length, displayColumns.length]);

    const createTableColumn = useCallback((tableColumn: ProColumns<ProjectTaskPayload>) => {
        setTableColumns(tableColumns => {
            const exists = tableColumns.some(c => c.key === tableColumn.key)
            if (!exists) {
                tableColumns.splice(tableColumns.length - 1, 0, tableColumn);
            } else {
                failure("Column already exists", 2).then();
            }
            return tableColumns;
        });
    }, [failure]);

    const displayTableColumn = useCallback((columnKey: React.Key) => {
        if (columnKey === "*") {
            setDisplayColumns(tableColumns);
        } else {
            setDisplayColumns(columns => {
                const column = tableColumns.find(column => column.key === columnKey);
                if (column) {
                    return [...columns, column];
                }
                return columns;
            });
        }
    }, [tableColumns]);

    const hiddenTableColumn = useCallback((columnKey: React.Key) => {
        if (columnKey === "*") {
            setDisplayColumns([]);
        } else {
            setDisplayColumns(columns => columns.filter((column) => column.key !== columnKey));
        }
    }, []);

    const updateTableColumn = useCallback((tableColumn: ProColumns<ProjectTaskPayload>) => {
        setTableColumns(tableColumns => tableColumns.map(c => c.key === tableColumn.key ? tableColumn : c));
    }, []);

    useEffect(() => {
        const defaultColumns: Array<ProColumns<ProjectTaskPayload>> = [
            {
                key: "taskName",
                title: "TaskName",
                dataIndex: "taskName",
                fieldProps: {
                    placeholder: "This field is required.",
                },
                formItemProps: {
                    rules: [
                        {required: true, message: "This field is required."},
                    ],
                },
                minWidth: 200,
            },
            {
                key: "action",
                title: "Action",
                valueType: "option",
                width: 100,
                render: () => {
                    return null;
                },
            }
        ];
        projectTaskService.getProjectTaskAttributesByProjectId(projectId, attributes => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            const columns: ProColumns<ProjectTaskPayload>[] = attributes.map(attribute => {
                const properties: JsonObject = JSON.parse(attribute.properties ?? "{}");
                return {
                    key: attribute.taskAttributeName,
                    title: properties.title ?? attribute.taskAttributeName,
                    dataIndex: attribute.taskAttributeName,
                    valueType: properties.valueType,
                    minWidth: properties.minWidth,
                    fieldProps: properties.fieldProps,
                }
            });
            const tableColumns = defaultColumns.concat(columns);
            setTableColumns(tableColumns);
            setDisplayColumns(tableColumns);
        }, error => {
            console.log(error);
        });
    }, [projectId, projectTaskService]);

    return {
        tableColumns,
        displayColumns,
        hiddenTableColumn,
        createTableColumn,
        updateTableColumn,
        displayTableColumn,
        isAllColumnsVisible,
        createTableColumnMessage: contextHolderMessage,
    }
}