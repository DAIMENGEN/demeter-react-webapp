import {Modal} from "antd";
import {useCallback} from "react";
import {useDemeterDispatch} from "@D/core/store/demeter-hook";
import {ProjectService} from "@D/http/service/project-service";
import {ProjectPayload} from "@D/http/payload/project-payload.ts";
import {deleteProject} from "@D/core/store/features/project-slice";
import {useAntdMessage} from "@D/core/hooks/message/use-antd-message";

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
                projectService.deleteProjectByIdRequest(projectId, (deletedProject: ProjectPayload) => {
                    dispatch(deleteProject(deletedProject));
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