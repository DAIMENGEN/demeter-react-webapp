/**
 * Defines the common data structure for a database entity.
 * This type represents the basic attributes of a database entity, including creation and update information.
 */
export type DbEntityData = {
    id: string; // The unique identifier of the entity
    creatorId: string; // The user identifier of the creator of the entity
    updaterId: string; // The user identifier of the last updater of the entity
    createDateTime: string; // The timestamp when the entity was created
    updateDateTime: string; // The timestamp when the entity was last updated
}
