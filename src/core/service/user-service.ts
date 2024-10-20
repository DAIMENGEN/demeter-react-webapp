import {BaseService} from "@D/core/service/service";
import {UserEntity} from "@D/core/entity/user-entity";
import {DbEntityData} from "@D/utils/database/db-entity-data";
import {DbEntityDataFactory} from "@D/utils/database/db-entity-data-factory";

export class UserService extends BaseService<UserEntity> {
    public create(partialFields: Omit<UserEntity, keyof DbEntityData>): UserEntity {
        return DbEntityDataFactory.create<UserEntity>(this.adminId, UserEntity, partialFields);
    }

    public update(oldUser: UserEntity, partialFields: Omit<UserEntity, keyof DbEntityData>): UserEntity {
        return DbEntityDataFactory.update(this.adminId, UserEntity, oldUser, partialFields);
    }

    public login(account: string, password: string, successCallback: (user: UserEntity) => void, failedCallback: (error: Error) => void): void {
        const URL = "/loginRoute";
        this.post<UserEntity>(URL, {account, password}).then(successCallback).catch(failedCallback);
    }

    public registerRequest(user: UserEntity, callback: (user: UserEntity) => void): void {
        const URL = "/registerRoute";
        this.post<UserEntity>(URL, user).then(callback);
    }

    public batchRegisterRequest(users: Array<UserEntity>, callback: (users: Array<UserEntity>) => void): void {
        const URL = "/batchRegisterRoute";
        this.post<Array<UserEntity>>(URL, users).then(callback);
    }

    public updateUserRequest(user: UserEntity, callback: (updatedUser: UserEntity) => void): void {
        const URL = "/updateUserRoute";
        this.post<UserEntity>(URL, user).then(callback);
    }

    public batchUpdateUserRequest(users: Array<UserEntity>, callback: (updatedUsers: Array<UserEntity>) => void): void {
        const URL = "/batchUpdateUserRoute";
        this.post<Array<UserEntity>>(URL, users).then(callback);
    }

    public getAllUsersRequest(callback: (users: Array<UserEntity>) => void): void {
        const URL = "/getAllUsersRoute";
        this.post<Array<UserEntity>>(URL).then(callback);
    }

    public getUsersByTeamIdRequest(teamId: string, callback: (users: Array<UserEntity>) => void): void {
        const URL = "/getUsersByTeamIdRoute";
        this.post<Array<UserEntity>>(URL, {teamId}).then(callback)
    }

    public getUsersByDepartmentIdRequest(departmentId: string, callback: (users: Array<UserEntity>) => void): void {
        const URL = "/getUsersByDepartmentIdRoute";
        this.post<Array<UserEntity>>(URL, {departmentId}).then(callback)
    }
}