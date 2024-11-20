import {ProjectTaskEntity} from "@D/core/entity/project-task-entity";
import {SnowflakeIdUtil} from "@D/utils/snowflake/snowflake-id-util";
import dayjs from "dayjs";

export type MaintainScheduleTableRow = ProjectTaskEntity & {
    children?: Array<MaintainScheduleTableRow>;
}

export const defaultTableRowData = (parentKey?: string) => ({
    id: SnowflakeIdUtil.nextId().toString(),
    name: "New Schedule",
    taskType: 1,
    taskStatus: 3,
    startDateTime: dayjs().format("YYYY-MM-DD"),
    endDateTime: dayjs().add(1, "day").format("YYYY-MM-DD"),
    description: "New Schedule Description",
    taskRule: "New Schedule Rule",
    parentId: parentKey,
    order: 0
})