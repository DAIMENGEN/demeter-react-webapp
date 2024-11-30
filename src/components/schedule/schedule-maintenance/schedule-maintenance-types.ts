import {Dictionary} from "@D/utils/dictionary.ts";
import {ProjectTaskEntity} from "@D/core/entity/project-task-entity";

export type MaintainScheduleTableRow = ProjectTaskEntity & {
    taskOwner: string;
    taskAssigner: string;
    children?: Array<MaintainScheduleTableRow>;
}

export type DataSourceType = ProjectTaskEntity & Dictionary;