import {SnowflakeIdUtil} from "@D/utils/snowflake/snowflake-id-util";
import {EntityData} from "@D/utils/entity/entity-data";

export abstract class EntityDataFactory {

    private static generateId(): string {
        return SnowflakeIdUtil.nextId().toString();
    }

    public static create<T extends EntityData>(entityType: { new(...args: any[]): T }, partialData: Partial<T>): T {
        const defaultData: EntityData = {
            id: EntityDataFactory.generateId(),
        };
        const completeData = { ...defaultData, ...partialData };
        return new entityType(...Object.values(completeData));
    }

    public static update<T extends EntityData>(entityType: { new(...args: any[]): T }, oldEntity: T, updatedData: Partial<T>): T {
        const completeData = { ...oldEntity, ...updatedData };
        return new entityType(...Object.values(completeData));
    }
}