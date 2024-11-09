import {useCallback} from "react";
import {ProjectEntity} from "@D/core/entity/project-entity";
import {useDemeterDispatch} from "@D/core/store/demeter-hook";
import {ProjectService} from "@D/core/service/project-service";
import {addProjectEntity} from "@D/core/store/features/project-slice";
import {setAddScheduleModalVisible} from "@D/core/store/features/schedule-slice";

export const useAddSchedule = () => {
    const dispatch = useDemeterDispatch();
    return useCallback((value: {
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
        });
    }, [dispatch]);
}