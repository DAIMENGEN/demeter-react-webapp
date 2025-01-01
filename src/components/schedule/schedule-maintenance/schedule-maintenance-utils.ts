import dayjs from "dayjs";
import {SnowflakeIdUtil} from "@D/utils/snowflake-id-util.ts";
import {DataSourceType} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";

export class ScheduleMaintenanceUtils {
    public static createRecord(employeeId: string, parentKey?: string, copyTableRow?: DataSourceType): DataSourceType {
        if (copyTableRow) {
            return {
                ...copyTableRow,
                id: SnowflakeIdUtil.nextId().toString()
            }
        }
        return {
            id: SnowflakeIdUtil.nextId().toString(),
            taskName: "New Schedule",
            taskOwner: employeeId,
            taskAssigner: employeeId,
            taskType: 1,
            taskStatus: 3,
            startDateTime: dayjs().format("YYYY-MM-DD"),
            endDateTime: dayjs().add(1, "day").format("YYYY-MM-DD"),
            description: "New Schedule Description",
            taskRule: "New Schedule Rule",
            parentId: parentKey,
            order: 0
        }
    }
}