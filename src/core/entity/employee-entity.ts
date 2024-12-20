import {EntityData} from "@D/core/entity/entity-data";

export interface IEmployeeEntity extends EntityData {
    account: string;
    password: string;
    employeeName: string;
    email: string;
    phone: string;
    isActive: boolean;
}

export class EmployeeEntity implements IEmployeeEntity {
    id: string;
    account: string;
    password: string;
    employeeName: string;
    email: string;
    phone: string;
    isActive: boolean;

    constructor(
        id: string,
        account: string,
        password: string,
        employeeName: string,
        email: string,
        phone: string,
        isActive: boolean,
    ) {
        this.id = id;
        this.account = account;
        this.password = password;
        this.employeeName = employeeName;
        this.email = email;
        this.phone = phone;
        this.isActive = isActive;
    }
}