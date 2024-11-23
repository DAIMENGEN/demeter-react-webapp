import {ProColumns} from "@ant-design/pro-table";
import {MaintainScheduleTableRow} from "@D/components/schedule/maintenance-schedule/maintenance-schedule-helper";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {ProjectTaskService} from "@D/core/service/project-task-service";
import {SelectProps, Spin} from "antd";
import {debounce} from "lodash";
import {EmployeeService} from "@D/core/service/employee-service";
import {useEmployeeName} from "@D/core/hooks/use-employee-name";

export const useMaintenanceScheduleTableColumns = () => {
    const fetchEmployeeRef = useRef(0);

    const employeeName = useEmployeeName();
    const [fetchingEmployee, setFetchingEmployee] = useState(false);
    const [employeeOptions, setEmployeeOptions] = useState<SelectProps["options"]>();
    const [taskTypeOptions, setTaskTypeOptions] = useState<SelectProps["options"]>();
    const [taskStatusOptions, setTaskStatusOptions] = useState<SelectProps["options"]>();

    const employeeService = useMemo(() => EmployeeService.getInstance(), []);
    const projectTaskService = useMemo(() => ProjectTaskService.getInstance(), []);

    const getEmployeeOptions = useCallback((employeeName: string, success: (options: SelectProps["options"]) => void) => {
        employeeService.getEmployeeSelectOptionsRequest(employeeName, options => success(options));
    }, [employeeService]);

    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
            fetchEmployeeRef.current += 1;
            const fetchId = fetchEmployeeRef.current;
            setEmployeeOptions([]);
            setFetchingEmployee(true);
            getEmployeeOptions(value, options => {
                if (fetchId !== fetchEmployeeRef.current) return;
                options && setEmployeeOptions(options);
                setFetchingEmployee(false);
            });
        };
        return debounce(loadOptions, 800);
    }, [getEmployeeOptions]);

    const columns: Array<ProColumns<MaintainScheduleTableRow>> = useMemo(() => [
        {
            key: "name",
            title: "TaskName",
            dataIndex: "name",
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
                onSearch: debounceFetcher,
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
                onSearch: debounceFetcher,
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
            title: "StartDateTime",
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
            title: "EndDateTime",
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
            key: "operation",
            title: "Operation",
            valueType: "option",
            width: 100,
            render: () => {
                return null;
            },
        },
    ], [debounceFetcher, employeeOptions, fetchingEmployee, taskStatusOptions, taskTypeOptions]);
    const [showColumns, setShowColumns] = useState(columns.map(column => column.key));

    useEffect(() => {
        projectTaskService.getProjectTaskTypeSelectOptionsRequest(setTaskTypeOptions);
        projectTaskService.getProjectTaskStatusSelectOptionsRequest(setTaskStatusOptions);
        getEmployeeOptions(employeeName, options => setEmployeeOptions(options));
    }, [employeeName, getEmployeeOptions, projectTaskService]);

    return {
        columns: columns.map(column => ({
            ...column,
            hidden: !showColumns.includes(column.key),
        })),
        showColumns,
        setShowColumns,
    }
}