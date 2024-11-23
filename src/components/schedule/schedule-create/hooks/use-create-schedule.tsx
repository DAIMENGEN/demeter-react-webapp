import {useCallback} from "react";
import {ProjectEntity} from "@D/core/entity/project-entity";
import {useDemeterDispatch} from "@D/core/store/demeter-hook";
import {ProjectService} from "@D/core/service/project-service";
import {addProjectEntity} from "@D/core/store/features/project-slice";
import {setAddScheduleModalVisible} from "@D/core/store/features/schedule-slice";
import {useAntdMessage} from "@D/core/hooks/message/use-antd-message";

export const useCreateSchedule = () => {
    const dispatch = useDemeterDispatch();
    const {contextHolderMessage, success, failure} = useAntdMessage();
    const addSchedule = useCallback((value: {
        name: string,
        status: number,
        startDateTime: string,
        endDateTime?: string,
        description?: string
    }) => {
        const projectService = ProjectService.getInstance();
        const projectEntity = projectService.create(value);
        projectService.createProjectRequest(projectEntity, (project: ProjectEntity) => {
            dispatch(addProjectEntity(project));
            dispatch(setAddScheduleModalVisible(false));
            success("Add project successfully").then();
        }, (error: Error) => failure(projectService.parseResponseError(error)));
    }, [dispatch, failure, success]);
    return {
        addScheduleHolderMessage: <>{contextHolderMessage}</>,
        addSchedule
    };
}