import {SelectProps} from "antd";
import {HttpService} from "@D/http/http-service.ts";
import {EmployeeEntity} from "@D/core/entity/employee-entity";
import {HttpPayload} from "@D/http/http-payload.ts";

export class EmployeeService extends HttpService<EmployeeEntity> {

    private static instance: EmployeeService;

    public static getInstance(): EmployeeService {
        if (!EmployeeService.instance) {
            EmployeeService.instance = new EmployeeService();
        }
        return EmployeeService.instance;
    }

    public create(partialFields: Omit<EmployeeEntity, keyof HttpPayload>): EmployeeEntity {
        const args: ConstructorParameters<typeof EmployeeEntity> = [
            this.generateId(),
            partialFields.account,
            partialFields.password,
            partialFields.employeeName,
            partialFields.email,
            partialFields.phone,
            partialFields.isActive,
        ];
        return new EmployeeEntity(...args);
    }

    public loginRequest(account: string, password: string, success: (token: string) => void, failure?: (error: Error) => void): void {
        const URL = "/loginRoute";
        this.post<string>(URL, {account, password}).then(success).catch(failure);
    }

    public logoutRequest(account: string, success: () => void, failure?: (error: Error) => void): void {
        const URL = "/logoutRoute";
        this.post<string>(URL, {account}).then(success).catch(failure);
    }

    public registerRequest(employee: EmployeeEntity, success: (user: EmployeeEntity) => void, failure?: (error: Error) => void): void {
        const URL = "/registerRoute";
        this.post<EmployeeEntity>(URL, {employee}).then(success).catch(failure);
    }

    public batchRegisterRequest(employees: Array<EmployeeEntity>, success: (employees: Array<EmployeeEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/batchRegisterRoute";
        this.post<Array<EmployeeEntity>>(URL, {employees}).then(success).catch(failure);
    }

    public resetPasswordRequest(newPassword: string, oldPassword: string, success: (employee: EmployeeEntity) => void, failure?: (error: Error) => void): void {
        const URL = "/resetPasswordRoute";
        this.post<EmployeeEntity>(URL, {newPassword, oldPassword}).then(success).catch(failure);
    }

    public getCurrentEmployeeIdRequest(success: (employeeId: string) => void, failure?: (error: Error) => void): void {
        const URL = "/getCurrentEmployeeIdRoute";
        this.get<string>(URL).then(success).catch(failure);
    }

    public getCurrentEmployeeNameRequest(success: (username: string) => void, failure?: (error: Error) => void): void {
        const URL = "/getCurrentEmployeeNameRoute";
        this.get<string>(URL).then(success).catch(failure);
    }

    public getEmployeeSelectOptionsRequest(employeeName: string, success: (options: SelectProps["options"]) => void, failure?: (error: Error) => void): void {
        const URL = "/getEmployeeSelectOptionsRoute";
        this.post<SelectProps["options"]>(URL, {employeeName}).then(success).catch(failure);
    }
}