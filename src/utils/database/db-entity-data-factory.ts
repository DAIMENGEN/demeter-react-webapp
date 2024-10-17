import dayjs from "dayjs";
import {SnowflakeIdUtil} from "@D/utils/snowflake/snowflake-id-util";
import {DbEntityData} from "@D/utils/database/db-entity-data";

export abstract class DbEntityDataFactory {

    private static generateId(): string {
        return SnowflakeIdUtil.nextId().toString();
    }

    public static create<T extends DbEntityData>(currentUserId: string, entityType: { new(...args: any[]): T }, partialData: Partial<T>): T {
        const currentDateTime = dayjs().format("YYYY-MM-DD HH:mm:ss");
        const defaultData: DbEntityData = {
            id: DbEntityDataFactory.generateId(),
            creatorId: currentUserId,
            updaterId: currentUserId,
            createDateTime: currentDateTime,
            updateDateTime: currentDateTime,
        };
        const completeData = { ...defaultData, ...partialData };
        return new entityType(...Object.values(completeData));
    }
}