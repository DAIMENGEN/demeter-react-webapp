import {ProColumns} from "@ant-design/pro-table";
import {MaintainScheduleTableRow} from "@D/components/schedule/maintenance-schedule/maintenance-schedule-helper";
import {useEffect, useMemo, useState} from "react";
import {ProjectTaskService} from "@D/core/service/project-task-service";
import {SelectProps} from "antd";

export const useMaintenanceScheduleTableColumns = () => {
    const [taskTypeOptions, setTaskTypeOptions] = useState<SelectProps["options"]>();
    const [taskStatusOptions, setTaskStatusOptions] = useState<SelectProps["options"]>();
    const columns: Array<ProColumns<MaintainScheduleTableRow>> = useMemo(() => [
        {
            key: "name",
            title: "TaskName",
            dataIndex: "name",
        },
        {
            key: "taskType",
            title: "TaskType",
            dataIndex: "taskType",
            valueType: "select",
            minWidth: 180,
            fieldProps: {
                options: taskTypeOptions,
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
            title: "操作",
            valueType: "option",
            width: 100,
            render: () => {
                return null;
            },
        },
    ], [taskStatusOptions, taskTypeOptions]);
    useEffect(() => {
        const projectTaskService = ProjectTaskService.getInstance();
        projectTaskService.getProjectTaskTypeSelectOptionsRequest(setTaskTypeOptions);
        projectTaskService.getProjectTaskStatusSelectOptionsRequest(setTaskStatusOptions);
    }, []);
    return columns
}