import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {ProColumns} from "@ant-design/pro-table";
import {DataSourceType} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types.ts";
import {useAntdMessage} from "@D/core/hooks/message/use-antd-message.tsx";
import {useEmployeeId} from "@D/core/hooks/employee/use-employee-id.tsx";
import {useEmployeeName} from "@D/core/hooks/employee/use-employee-name.tsx";
import {debounce} from "lodash";
import {EmployeeService} from "@D/core/service/employee-service.ts";
import {ProjectTaskService} from "@D/core/service/project-task-service.ts";
import {SelectProps, Spin} from "antd";

export const useTableColumns = () => {

    const employeeId = useEmployeeId();

    const employeeName = useEmployeeName();

    const {contextHolderMessage, failure} = useAntdMessage();

    const fetchEmployeeRef = useRef(0);

    const [fetchingEmployee, setFetchingEmployee] = useState(false);

    const [employeeOptions, setEmployeeOptions] = useState<SelectProps["options"]>();

    const [taskTypeOptions, setTaskTypeOptions] = useState<SelectProps["options"]>();

    const [taskStatusOptions, setTaskStatusOptions] = useState<SelectProps["options"]>();

    const [columns, setColumns] = useState<ProColumns<DataSourceType>[]>([]);

    const [displayColumns, setDisplayColumns] = useState<React.Key[]>([]);

    const isAllColumnsVisible = useMemo(() => displayColumns.length === columns.length, [columns.length, displayColumns.length]);

    const tableColumns = useMemo(() => columns.map(column => {
        return {
            ...column,
            hidden: !!column.key && !displayColumns.includes(column.key), // if key === undefined, then it will be displayed by default
        }
    }), [columns, displayColumns]);

    const employeeService = useMemo(() => EmployeeService.getInstance(), []);

    const projectTaskService = useMemo(() => ProjectTaskService.getInstance(), []);

    const fetchEmployee = useCallback(() => {
        const defaultOptions = [{label: employeeName, value: employeeId}];
        const loadOptions = (value: string) => {
            fetchEmployeeRef.current += 1;
            const fetchId = fetchEmployeeRef.current;
            setFetchingEmployee(true);
            if (value) {
                employeeService.getEmployeeSelectOptionsRequest(value, options => {
                    if (fetchId !== fetchEmployeeRef.current) return;
                    if (options) {
                        const find = options.find(option => option.value === employeeId);
                        setEmployeeOptions(find ? options : [...options, ...defaultOptions]);
                    }
                    setFetchingEmployee(false);
                });
            }
        };
        return debounce(loadOptions, 800);
    }, [employeeId, employeeName, employeeService]);

    const addColumn = useCallback((column: ProColumns<DataSourceType>) => {
        setColumns(columns => {
            const exists = columns.some(c => c.key === column.key)
            if (!exists) {
                const actionIndex = columns.findIndex(column => column.key === "action");
                columns.splice(actionIndex, 0, column);
            } else {
                failure("Column already exists", 2).then();
            }
            return columns;
        });
    }, [failure]);

    const showColumn = useCallback((columnKey: React.Key) => {
        if (columnKey === "*") {
            setDisplayColumns(columns.map(column => column.key).filter(columnKey => typeof columnKey !== "undefined"));
        } else {
            setDisplayColumns(columns => {
                if (columns.includes(columnKey)) {
                    return columns;
                } else {
                    return [...columns, columnKey];
                }
            });
        }
    }, [columns]);

    const hideColumn = useCallback((columnKey: React.Key) => {
        if (columnKey === "*") {
            setDisplayColumns([]);
        } else {
            setDisplayColumns(columns => columns.filter((column) => column !== columnKey));
        }
    }, []);
    
    const updateColumn = useCallback((column: ProColumns<DataSourceType>) => {
        setColumns(columns => columns.map(c => c.key === column.key ? column : c));
    }, []);

    useEffect(() => {
        projectTaskService.getProjectTaskTypeSelectOptionsRequest(setTaskTypeOptions);
        projectTaskService.getProjectTaskStatusSelectOptionsRequest(setTaskStatusOptions);
        employeeService.getEmployeeSelectOptionsRequest(employeeName, setEmployeeOptions);
    }, [employeeName, employeeService, projectTaskService]);

    useEffect(() => {
        const defaultColumns: Array<ProColumns<DataSourceType>> = [
            {
                key: "name",
                title: "TaskName",
                dataIndex: "name",
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
                key: "taskOwner",
                title: "TaskOwner",
                dataIndex: "taskOwner",
                valueType: "select",
                minWidth: 180,
                fieldProps: {
                    options: employeeOptions,
                    showSearch: true,
                    filterOption: false,
                    onSearch: fetchEmployee,
                    notFoundContent: fetchingEmployee ? <Spin size="small"/> : "Not Found",
                }
            },
            {
                key: "taskAssigner",
                title: "TaskAssigner",
                dataIndex: "taskAssigner",
                valueType: "select",
                minWidth: 180,
                fieldProps: {
                    options: employeeOptions,
                    showSearch: true,
                    filterOption: false,
                    onSearch: fetchEmployee,
                    notFoundContent: fetchingEmployee ? <Spin size="small"/> : "Not Found",
                }
            },
            {
                key: "taskType",
                title: "TaskType",
                dataIndex: "taskType",
                valueType: "select",
                minWidth: 180,
                fieldProps: {
                    options: taskTypeOptions,
                    showSearch: true,
                },
            },
            {
                key: "taskStatus",
                title: "TaskStatus",
                dataIndex: "taskStatus",
                valueType: "select",
                minWidth: 180,
                fieldProps: {
                    options: taskStatusOptions,
                    showSearch: true,
                },
            },
            {
                key: "startDateTime",
                title: "StartDate",
                dataIndex: "startDateTime",
                width: 150,
                formItemProps: {
                    rules: [
                        {required: true, message: "This field is required."},
                        {
                            pattern: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                            message: "Please enter a valid date format, e.g. 1954-01-01.",
                        },
                    ],
                },
            },
            {
                key: "endDateTime",
                title: "EndDate",
                dataIndex: "endDateTime",
                width: 150,
                formItemProps: {
                    rules: [
                        {
                            pattern: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                            message: "Please enter a valid date format, e.g. 1954-01-01.",
                        },
                    ],
                },
            },
            {
                key: "description",
                title: "Description",
                dataIndex: "description",
                minWidth: 300,
                valueType: "textarea",
                fieldProps: {
                    rows: 1,
                },
            },
            {
                key: "taskRule",
                title: "TaskRule",
                dataIndex: "taskRule",
                minWidth: 200,
            },
            {
                key: "order",
                title: "Order",
                dataIndex: "order",
                width: 100,
            },
            {
                key: "action",
                title: "Action",
                valueType: "option",
                width: 100,
                render: () => {
                    return null;
                },
            },
        ];
        const defaultDisplayColumns = defaultColumns.map(column => column.key).filter(columnKey => typeof columnKey !== "undefined");
        setColumns(defaultColumns);
        setDisplayColumns(defaultDisplayColumns);
    }, [employeeOptions, fetchEmployee, fetchingEmployee, taskStatusOptions, taskTypeOptions]);

    return {
        columns: tableColumns,
        addColumn,
        showColumn,
        hideColumn,
        updateColumn,
        displayColumns,
        addColumnMessage: contextHolderMessage,
        isAllColumnsVisible
    }
}