import "./rename-schedule.scss";
import React, {useCallback, useEffect, useState} from "react";
import {Form, Input} from "antd";
import {FullDraggableModal} from "full-flex-ui";
import {useRenameScheduleModal} from "@D/components/schedule/rename-schedule/hooks/use-rename-schedule-modal";
import {ProjectEntity} from "@D/core/entity/project-entity";
import {ProjectService} from "@D/core/service/project-service";

export const RenameSchedule = () => {
    const [form] = Form.useForm();
    const [project, setProject] = useState<ProjectEntity>();
    const {
        renameScheduleModalVisible,
        setRenameScheduleModalVisible,
        renameScheduleId,
        renameScheduleHolderMessage,
        renameSchedule
    } = useRenameScheduleModal();

    const onFinish = useCallback((values: { name: string }) => {
        if (project) {
            const projectService = ProjectService.getInstance();
            const updateProject = projectService.update(project, {name: values.name});
            renameSchedule(updateProject);
            setRenameScheduleModalVisible(false);
        } else {
            console.error("RenameSchedule: Project is undefined");
        }
    }, [project, renameSchedule, setRenameScheduleModalVisible]);

    useEffect(() => {
        if (renameScheduleModalVisible) {
            const projectService = ProjectService.getInstance();
            projectService.getProjectByIdRequest(renameScheduleId!, project => {
                setProject(project);
                form.setFieldValue("name", project.name);
            });
        }
    }, [form, renameScheduleId, renameScheduleModalVisible]);
    return (
        <FullDraggableModal classNames={{content: "rename-schedule-draggable-modal"}}
                            open={renameScheduleModalVisible}
                            title={"Rename schedule"}
                            closable={true}
                            onCancel={() => setRenameScheduleModalVisible(false)}
                            maskClosable={false}
                            cancelText={"Cancel"}
                            okText={"Rename"}
                            onOk={() => form.submit()}>
            {renameScheduleHolderMessage}
            <Form form={form} layout={"vertical"} onFinish={onFinish}>
                <Form.Item layout={"vertical"} name="name" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
            </Form>
        </FullDraggableModal>
    )
}