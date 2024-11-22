import {SnowflakeIdUtil} from "@D/utils/snowflake/snowflake-id-util";

/**
 * Defines the common data structure for an entity.
 */
export type EntityData = {
    id: string; // The unique identifier of the entity
}

export abstract class EntityDataFactory {

    private static generateId(): string {
        return SnowflakeIdUtil.nextId().toString();
    }

    public static create<T extends EntityData>(entityType: { new(...args: any[]): T }, partialData: Partial<T>): T {
        const defaultData: EntityData = {
            id: EntityDataFactory.generateId(),
        };
        const completeData = { ...defaultData, ...partialData };
        const instance = new entityType();
        Object.assign(instance, completeData);
        return instance;
    }

    public static update<T extends EntityData>(entityType: { new(...args: any[]): T }, oldEntity: T, updatedData: Partial<T>): T {
        const completeData = { ...oldEntity, ...updatedData };
        const instance = new entityType();
        Object.assign(instance, completeData);
        return instance;
    }
}
