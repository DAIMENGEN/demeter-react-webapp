import {EntityData} from "@D/core/entity/entity-data";

export interface IProjectEntity extends EntityData {
    name: string;
    status: number;
    startDateTime: string;
    description?: string;
    endDateTime?: string;
    version?: number;
    order?: number;
}

export class ProjectEntity implements IProjectEntity {
    id: string;
    name: string;
    status: number;
    startDateTime: string;
    description?: string;
    endDateTime?: string;
    version?: number;
    order?: number;

    constructor(
        id: string,
        name: string,
        status: number,
        startDateTime: string,
        description?: string,
        endDateTime?: string,
        version?: number,
        order?: number
    ) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.description = description;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.version = version;
        this.order = order;
    }
}