import {ProjectTaskEntity} from "@D/core/entity/project-task-entity";

export type MaintainScheduleTableRow = ProjectTaskEntity & {
    taskOwner: string;
    taskAssigner: string;
    children?: Array<MaintainScheduleTableRow>;
}