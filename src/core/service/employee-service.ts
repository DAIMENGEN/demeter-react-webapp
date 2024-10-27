import {BaseService} from "@D/core/service/service";
import {EmployeeEntity} from "@D/core/entity/employee-entity";
import {EntityData} from "@D/utils/entity/entity-data";
import {EntityDataFactory} from "@D/utils/entity/entity-data-factory";

export class EmployeeService extends BaseService<EmployeeEntity> {
    public create(partialFields: Omit<EmployeeEntity, keyof EntityData>): EmployeeEntity {
        return EntityDataFactory.create<EmployeeEntity>(EmployeeEntity, partialFields);
    }

    public update(oldUser: EmployeeEntity, partialFields: Omit<EmployeeEntity, keyof EntityData>): EmployeeEntity {
        return EntityDataFactory.update(EmployeeEntity, oldUser, partialFields);
    }

    public login(account: string, password: string, successCallback: (token: string) => void, failedCallback: (error: Error) => void): void {
        const URL = "/loginRoute";
        this.post<string>(URL, {account, password}).then(successCallback).catch(failedCallback);
    }

    public registerRequest(user: EmployeeEntity, callback: (user: EmployeeEntity) => void): void {
        const URL = "/registerRoute";
        this.post<EmployeeEntity>(URL, user).then(callback);
    }

    public batchRegisterRequest(users: Array<EmployeeEntity>, callback: (users: Array<EmployeeEntity>) => void): void {
        const URL = "/batchRegisterRoute";
        this.post<Array<EmployeeEntity>>(URL, users).then(callback);
    }

    public updateUserRequest(user: EmployeeEntity, callback: (updatedUser: EmployeeEntity) => void): void {
        const URL = "/updateUserRoute";
        this.post<EmployeeEntity>(URL, user).then(callback);
    }

    public batchUpdateUserRequest(users: Array<EmployeeEntity>, callback: (updatedUsers: Array<EmployeeEntity>) => void): void {
        const URL = "/batchUpdateUserRoute";
        this.post<Array<EmployeeEntity>>(URL, users).then(callback);
    }

    public getAllUsersRequest(callback: (users: Array<EmployeeEntity>) => void): void {
        const URL = "/getAllUsersRoute";
        this.post<Array<EmployeeEntity>>(URL).then(callback);
    }

    public getUsersByTeamIdRequest(teamId: string, callback: (users: Array<EmployeeEntity>) => void): void {
        const URL = "/getUsersByTeamIdRoute";
        this.post<Array<EmployeeEntity>>(URL, {teamId}).then(callback)
    }

    public getUsersByDepartmentIdRequest(departmentId: string, callback: (users: Array<EmployeeEntity>) => void): void {
        const URL = "/getUsersByDepartmentIdRoute";
        this.post<Array<EmployeeEntity>>(URL, {departmentId}).then(callback)
    }
}