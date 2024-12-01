import {EntityData} from "@D/core/entity/entity-data";

export interface IProjectEntity extends EntityData {
    projectName: string;
    projectStatus: number;
    startDateTime: string;
    description?: string;
    endDateTime?: string;
    version?: number;
    order?: number;
}

export class ProjectEntity implements IProjectEntity {
    id: string;
    projectName: string;
    projectStatus: number;
    startDateTime: string;
    description?: string;
    endDateTime?: string;
    version?: number;
    order?: number;

    constructor(
        id: string,
        projectName: string,
        projectStatus: number,
        startDateTime: string,
        description?: string,
        endDateTime?: string,
        version?: number,
        order?: number
    ) {
        this.id = id;
        this.projectName = projectName;
        this.projectStatus = projectStatus;
        this.description = description;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.version = version;
        this.order = order;
    }
}