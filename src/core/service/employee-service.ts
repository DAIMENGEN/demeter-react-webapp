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

    public loginRequest(account: string, password: string, success: (token: string) => void, failure?: (error: Error) => void): void {
        const URL = "/loginRoute";
        this.post<string>(URL, {account, password}).then(success).catch(failure);
    }

    public logoutRequest(account: string, success: () => void, failure?: (error: Error) => void): void {
        const URL = "/logoutRoute";
        this.post<string>(URL, {account}).then(success).catch(failure);
    }

    public registerRequest(user: EmployeeEntity, success: (user: EmployeeEntity) => void, failure?: (error: Error) => void): void {
        const URL = "/registerRoute";
        this.post<EmployeeEntity>(URL, user).then(success).catch(failure);
    }

    public batchRegisterRequest(users: Array<EmployeeEntity>, success: (users: Array<EmployeeEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/batchRegisterRoute";
        this.post<Array<EmployeeEntity>>(URL, users).then(success).catch(failure);
    }

    public resetPasswordRequest(newPassword: string, oldPassword: string, success: (employee: EmployeeEntity) => void, failure?: (error: Error) => void): void {
        const URL = "/resetPasswordRoute";
        this.post<EmployeeEntity>(URL, {newPassword, oldPassword}).then(success).catch(failure);
    }

    public getUsernameRequest(success: (username: string) => void, failure?: (error: Error) => void): void {
        const URL = "/getUsernameRoute";
        this.get<string>(URL).then(success).catch(failure);
    }
}