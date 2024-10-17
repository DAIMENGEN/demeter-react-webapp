import {DbEntityData} from "@D/utils/database/db-entity-data";

export interface IUserEntity extends DbEntityData {
    account: string;
    password: string;
    username: string;
    email: string;
    phone: string;
    teamId: string;
    departmentId: string;
    isActive: boolean;
}

export class UserEntity implements IUserEntity {
    id: string;
    account: string;
    password: string;
    username: string;
    email: string;
    phone: string;
    teamId: string;
    departmentId: string;
    isActive: boolean;
    creatorId: string;
    updaterId: string;
    createDateTime: string;
    updateDateTime: string;

    constructor(
        id: string,
        account: string,
        password: string,
        username: string,
        email: string,
        phone: string,
        teamId: string,
        departmentId: string,
        isActive: boolean,
        creatorId: string,
        updaterId: string,
        createDateTime: string,
        updateDateTime: string
    ) {
        this.id = id;
        this.account = account;
        this.password = password;
        this.username= username;
        this.email = email;
        this.phone = phone;
        this.teamId = teamId;
        this.departmentId = departmentId;
        this.isActive = isActive;
        this.creatorId = creatorId;
        this.updaterId = updaterId;
        this.createDateTime = createDateTime;
        this.updateDateTime = updateDateTime;
    }
}