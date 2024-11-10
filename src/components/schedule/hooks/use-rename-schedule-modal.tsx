import {useDemeterDispatch, useDemeterSelector} from "@D/core/store/demeter-hook";
import {setRenameScheduleId, setRenameScheduleModalVisible} from "@D/core/store/features/schedule-slice";
import {ProjectEntity} from "@D/core/entity/project-entity";
import {useCallback} from "react";
import {ProjectService} from "@D/core/service/project-service";
import {useAntdMessage} from "@D/core/hooks/use-antd-message";
import {updateProjectEntity} from "@D/core/store/features/project-slice";

export const useRenameScheduleModal = () => {
    const dispatch = useDemeterDispatch();
    const {contextHolderMessage, success, failure} = useAntdMessage();
    const setVisible = (visible: boolean) => {
        dispatch(setRenameScheduleModalVisible(visible));
    }
    const visible = useDemeterSelector(state => state.scheduleStore.renameScheduleModalVisible);
    const setCurrentRenameScheduleId = (scheduleId: string) => {
        dispatch(setRenameScheduleId(scheduleId));
    }
    const currentRenameScheduleId = useDemeterSelector(state => state.scheduleStore.renameScheduleId);

    const renameSchedule = useCallback((project: ProjectEntity) => {
        const projectService = ProjectService.getInstance();
        projectService.updateProjectRequest(project, updatedProject => {
            dispatch(updateProjectEntity(updatedProject));
            success("Rename project successfully").then();
        }, error => failure(projectService.parseResponseError(error)))
    }, [dispatch, failure, success]);

    return {
        renameScheduleHolderMessage: <>{contextHolderMessage}</>,
        renameScheduleModalVisible: visible,
        setRenameScheduleModalVisible: setVisible,
        renameScheduleId: currentRenameScheduleId,
        setRenameScheduleId: setCurrentRenameScheduleId,
        renameSchedule: renameSchedule
    };
}