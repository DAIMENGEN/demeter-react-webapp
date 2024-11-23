import {useEffect, useState} from "react";
import {SelectProps} from "antd";
import {ProjectService} from "@D/core/service/project-service";

export const useScheduleStatus = () => {
    const [scheduleStatus, setScheduleStatus] = useState<SelectProps["options"]>([]);
    useEffect(() => {
        const projectService = ProjectService.getInstance();
        projectService.getProjectStatusSelectOptionsRequest(setScheduleStatus);
    }, [setScheduleStatus]);
    return scheduleStatus;
}