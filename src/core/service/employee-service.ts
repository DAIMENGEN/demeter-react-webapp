import {BaseService} from "@D/core/service/service";
import {EmployeeEntity} from "@D/core/entity/employee-entity";
import {EntityData} from "@D/utils/entity/entity-data";
import {EntityDataFactory} from "@D/utils/entity/entity-data-factory";

export class EmployeeService extends BaseService<EmployeeEntity> {

    private static instance: EmployeeService;

    public static getInstance(): EmployeeService {
        if (!EmployeeService.instance) {
            EmployeeService.instance = new EmployeeService();
        }
        return EmployeeService.instance;
    }

    public create(partialFields: Omit<EmployeeEntity, keyof EntityData>): EmployeeEntity {
        return EntityDataFactory.create<EmployeeEntity>(EmployeeEntity, partialFields);
    }

    public update(oldUser: EmployeeEntity, partialFields: Omit<EmployeeEntity, keyof EntityData>): EmployeeEntity {
        return EntityDataFactory.update(EmployeeEntity, oldUser, partialFields);
    }

    public loginRequest(account: string, password: string, successCallback: (token: string) => void, failedCallback?: (error: Error) => void): void {
        const URL = "/loginRoute";
        this.post<string>(URL, {account, password}).then(successCallback).catch(failedCallback);
    }

    public logoutRequest(account: string, successCallback: () => void, failedCallback?: (error: Error) => void): void {
        const URL = "/logoutRoute";
        this.post<string>(URL, {account}).then(successCallback).catch(failedCallback);
    }

    public registerRequest(user: EmployeeEntity, successCallback: (user: EmployeeEntity) => void, failedCallback?: (error: Error) => void): void {
        const URL = "/registerRoute";
        this.post<EmployeeEntity>(URL, user).then(successCallback).catch(failedCallback);
    }

    public batchRegisterRequest(users: Array<EmployeeEntity>, successCallback: (users: Array<EmployeeEntity>) => void, failedCallback?: (error: Error) => void): void {
        const URL = "/batchRegisterRoute";
        this.post<Array<EmployeeEntity>>(URL, users).then(successCallback).catch(failedCallback);
    }

    public resetPasswordRequest(newPassword: string, oldPassword: string, successCallback: (employee: EmployeeEntity) => void, failedCallback?: (error: Error) => void): void {
        const URL = "/resetPasswordRoute";
        this.post<EmployeeEntity>(URL, {newPassword, oldPassword}).then(successCallback).catch(failedCallback);
    }

    public getUsernameRequest(successCallback: (username: string) => void, failedCallback?: (error: Error) => void): void {
        const URL = "/getUsernameRoute";
        this.get<string>(URL).then(successCallback).catch(failedCallback);
    }
}