import {ProColumns} from "@ant-design/pro-table";
import {MaintainScheduleTableRow} from "@D/components/schedule/maintain-schedule/maintain-schedule-helper";
import {useEffect, useMemo, useState} from "react";
import {ProjectTaskService} from "@D/core/service/project-task-service";
import {SelectProps} from "antd";

export const useMaintainScheduleTableColumns = () => {
    const [taskTypeOptions, setTaskTypeOptions] = useState<SelectProps["options"]>();
    const [taskStatusOptions, setTaskStatusOptions] = useState<SelectProps["options"]>();
    const columns: Array<ProColumns<MaintainScheduleTableRow>> = useMemo(() => [
        {
            key: 'name',
            title: 'TaskName',
            dataIndex: 'name',
        },
        {
            key: 'taskType',
            title: 'TaskType',
            dataIndex: 'taskType',
            valueType: 'select',
            fieldProps: {
                options: taskTypeOptions
            },
        },
        {
            key: 'taskStatus',
            title: 'TaskStatus',
            dataIndex: 'taskStatus',
            valueType: 'select',
            fieldProps: {
                options: taskStatusOptions
            },
        },
        {
            key: 'startDateTime',
            title: 'StartDateTime',
            dataIndex: 'startDateTime',
            formItemProps: {
                rules: [
                    {required: true, message: "This field is required."},
                    {
                        pattern: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                        message: '"Please enter a valid date format, e.g. 1954-01-01."'
                    }
                ],
            }
        },
        {
            key: 'endDateTime',
            title: 'EndDateTime',
            dataIndex: 'endDateTime',
            formItemProps: {
                rules: [
                    {
                        pattern: /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
                        message: '"Please enter a valid date format, e.g. 1954-01-01."'
                    }
                ],
            }
        },
        {
            key: 'description',
            title: 'Description',
            dataIndex: 'description',
            valueType: 'textarea',
            fieldProps: {
                rows: 1,
            }
        },
        {
            key: 'taskRule',
            title: 'TaskRule',
            dataIndex: 'taskRule',
        },
        {
            key: 'order',
            title: 'Order',
            dataIndex: 'order',
        },
        {
            title: '操作',
            valueType: 'option',
            width: 250,
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