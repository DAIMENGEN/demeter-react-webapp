import {SelectProps} from "antd";
import {BaseService} from "@D/core/service/service";
import {ProjectEntity} from "@D/core/entity/project-entity";
import {EntityData, EntityDataFactory} from "@D/core/entity/entity-data";

export class ProjectService extends BaseService<ProjectEntity> {

    private static instance: ProjectService;

    public static getInstance(): ProjectService {
        if (!ProjectService.instance) {
            ProjectService.instance = new ProjectService();
        }
        return ProjectService.instance;
    }

    public create(partialFields: Omit<ProjectEntity, keyof EntityData>): ProjectEntity {
        return EntityDataFactory.create<ProjectEntity>(ProjectEntity, partialFields);
    }

    public update(oldProject: ProjectEntity, partialFields: Omit<ProjectEntity, keyof ProjectEntity>): ProjectEntity {
        return EntityDataFactory.update<ProjectEntity>(ProjectEntity, oldProject, partialFields);
    }

    public createProjectRequest(project: ProjectEntity, success: (project: ProjectEntity) => void, failure?: (error: Error) => void): void {
        const URL = "/createProjectRoute";
        this.post<ProjectEntity>(URL, project).then(success).catch(failure);
    }

    public createProjectsRequest(projects: Array<ProjectEntity>, success: (projects: Array<ProjectEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/createProjectsRoute";
        this.post<Array<ProjectEntity>>(URL, projects).then(success).catch(failure);
    }

    public deleteProjectByIdRequest(projectId: string, success: (deletedProject: ProjectEntity) => void, failure?: (error: Error) => void): void {
        const URL = "/deleteProjectByIdRoute";
        this.post<ProjectEntity>(URL, {projectId}).then(success).catch(failure);
    }

    public deleteProjectsByIdsRequest(projectIds: Array<string>, success: (deletedProjects: Array<ProjectEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/deleteProjectsByIdsRoute";
        this.post<Array<ProjectEntity>>(URL, {projectIds}).then(success).catch(failure);
    }

    public updateProjectRequest(project: ProjectEntity, success: (updatedProject: ProjectEntity) => void, failure?: (error: Error) => void): void {
        const URL = "/updateProjectRoute";
        this.put<ProjectEntity>(URL, project).then(success).catch(failure);
    }

    public updateProjectsRequest(projects: Array<ProjectEntity>, success: (updatedProjects: Array<ProjectEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/updateProjectsRoute";
        this.put<Array<ProjectEntity>>(URL, projects).then(success).catch(failure);
    }

    public getAllProjectsRequest(success: (projects: Array<ProjectEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/getAllProjectsRoute";
        this.get<Array<ProjectEntity>>(URL).then(success).catch(failure);
    }

    public getProjectByIdRequest(projectId: string, success: (project: ProjectEntity) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectByIdRoute";
        this.post<ProjectEntity>(URL, {projectId}).then(success).catch(failure);
    }

    public getProjectsByIdsRequest(projectIds: Array<string>, success: (projects: Array<ProjectEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectsByIdsRoute";
        this.post<Array<ProjectEntity>>(URL, {projectIds}).then(success).catch(failure);
    }

    public getProjectsByEmployeeIdRequest(success: (projects: Array<ProjectEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectsByEmployeeIdRoute";
        this.get<Array<ProjectEntity>>(URL).then(success).catch(failure);
    }

    public getProjectStatusSelectOptionsRequest(success: (options: SelectProps["options"]) => void, failure?: (error: Error) => void): void {
        const URL = "/getProjectStatusSelectOptionsRoute";
        this.get<SelectProps["options"]>(URL).then(success).catch(failure);
    }
}