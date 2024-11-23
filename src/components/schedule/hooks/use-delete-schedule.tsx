import {Modal} from "antd";
import {useCallback} from "react";
import {useDemeterDispatch} from "@D/core/store/demeter-hook";
import {ProjectService} from "@D/core/service/project-service";
import {ProjectEntity} from "@D/core/entity/project-entity";
import {deleteProjectEntity} from "@D/core/store/features/project-slice";
import {useAntdMessage} from "@D/common/hooks/message/use-antd-message";

export const useDeleteSchedule = () => {
    const [modal, contextHolder] = Modal.useModal();
    const dispatch = useDemeterDispatch();
    const {contextHolderMessage, success, failure} = useAntdMessage();
    const deleteSchedule = useCallback((projectId: string) => {
        const projectService = ProjectService.getInstance();
        modal.confirm({
            title: "Delete Schedule",
            content: "Are you sure to delete this schedule?",
            okText: "Yes",
            cancelText: "No",
            onOk: () => {
                projectService.deleteProjectByIdRequest(projectId, (deletedProject: ProjectEntity) => {
                    dispatch(deleteProjectEntity(deletedProject));
                    success("Delete project successfully").then();
                }, (error: Error) => failure(projectService.parseResponseError(error)));
            }
        })
    }, [dispatch, failure, modal, success]);
    return {
        deleteScheduleHolderMessage: <>{contextHolder}{contextHolderMessage}</>,
        deleteSchedule
    }
}