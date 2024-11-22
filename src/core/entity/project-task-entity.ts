import {EntityData} from "@D/core/entity/entity-data";

export interface IProjectTaskEntity extends EntityData {
    name: string;
    taskType: number;
    taskStatus: number;
    startDateTime: string;
    endDateTime?: string;
    description?: string;
    taskRule?: string;
    parentId?: string;
    order?: number;
}

export class ProjectTaskEntity implements IProjectTaskEntity {
    id: string;
    name: string;
    taskType: number;
    taskStatus: number;
    startDateTime: string;
    endDateTime?: string;
    description?: string;
    taskRule?: string;
    parentId?: string;
    order?: number;

    constructor(
        id: string,
        name: string,
        taskType: number,
        taskStatus: number,
        startDateTime: string,
        endDateTime?: string,
        description?: string,
        taskRule?: string,
        parentId?: string,
        order?: number
    ) {
        this.id = id;
        this.name = name;
        this.taskType = taskType;
        this.taskStatus = taskStatus;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.description = description;
        this.taskRule = taskRule;
        this.parentId = parentId;
        this.order = order;
    }
}