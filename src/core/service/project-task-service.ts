import {BaseService} from "@D/core/service/service";
import {ProjectTaskEntity} from "@D/core/entity/project-task-entity";
import {SelectProps} from "antd";
import {EntityData, EntityDataFactory} from "@D/core/entity/entity-data";

export class ProjectTaskService extends BaseService<ProjectTaskEntity> {

    private static instance: ProjectTaskService;

    public static getInstance(): ProjectTaskService {
        if (!ProjectTaskService.instance) {
            ProjectTaskService.instance = new ProjectTaskService();
        }
        return ProjectTaskService.instance;
    }

    public create(partialFields: Omit<ProjectTaskEntity, keyof EntityData>): ProjectTaskEntity {
        return EntityDataFactory.create<ProjectTaskEntity>(ProjectTaskEntity, partialFields);
    }

    public update(oldProjectTask: ProjectTaskEntity, partialFields: Omit<ProjectTaskEntity, keyof ProjectTaskEntity>): ProjectTaskEntity {
        return EntityDataFactory.update<ProjectTaskEntity>(ProjectTaskEntity, oldProjectTask, partialFields);
    }

    public getProjectTaskTypeSelectOptionsRequest(success: (options: SelectProps["options"]) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectTaskTypeSelectOptionsRoute";
        this.get<SelectProps["options"]>(URL).then(success).catch(failure);
    }

    public getProjectTaskStatusSelectOptionsRequest(success: (options: SelectProps["options"]) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectTaskStatusSelectOptionsRoute";
        this.get<SelectProps["options"]>(URL).then(success).catch(failure);
    }
}