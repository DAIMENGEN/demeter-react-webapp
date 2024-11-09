import {useDemeterDispatch} from "@D/core/store/demeter-hook";
import {useCallback} from "react";
import {ProjectService} from "@D/core/service/project-service";
import {ProjectEntity} from "@D/core/entity/project-entity";
import {deleteProjectEntity} from "@D/core/store/features/project-slice";
import {useAntdMessage} from "@D/core/hooks/use-antd-message";

export const useDeleteSchedule = () => {
    const dispatch = useDemeterDispatch();
    const {contextHolderMessage, success, failure} = useAntdMessage();
    const deleteSchedule = useCallback((projectId: string) => {
        const projectService = ProjectService.getInstance();
        projectService.deleteProjectByIdRequest(projectId, (deletedProject: ProjectEntity) => {
            dispatch(deleteProjectEntity(deletedProject));
            success("Delete project successfully").then();
        }, (error: Error) => failure(projectService.parseResponseError(error)));
    }, [dispatch, failure, success]);
    return {deleteScheduleHolderMessage: contextHolderMessage, deleteSchedule}
}