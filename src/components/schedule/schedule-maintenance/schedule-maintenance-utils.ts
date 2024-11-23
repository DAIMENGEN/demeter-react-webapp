import dayjs from "dayjs";
import {SnowflakeIdUtil} from "@D/utils/snowflake/snowflake-id-util";
import {MaintainScheduleTableRow} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";

export class ScheduleMaintenanceUtils {
    public static createDefaultRecord(employeeId: string, parentKey?: string): MaintainScheduleTableRow {
        return {
            id: SnowflakeIdUtil.nextId().toString(),
            name: "New Schedule",
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