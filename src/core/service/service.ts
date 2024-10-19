import {HttpClient} from "@D/http/http-client";
import {DbEntityData} from "@D/utils/database/db-entity-data";

export interface Service<T> {

    create(partialFields: Omit<T, keyof DbEntityData>): T;

    update(oldEntity: T, partialFields: Omit<T, keyof DbEntityData>): T;

}

export abstract class BaseService<T> implements Service<T> {

    adminId: string = "1";

    private httpClient: HttpClient = new HttpClient();

    get<T>(url: string, params?: Record<string, any>): Promise<T> {
        return this.httpClient.get<T>(url, params);
    }

    put<T>(url: string, params?: Record<string, any>): Promise<T> {
        return this.httpClient.put<T>(url, params);
    }

    post<T>(url: string, params?: Record<string, any>): Promise<T> {
        return this.httpClient.post<T>(url, params);
    }

    abstract create(partialFields: Omit<T, keyof DbEntityData>): T

    abstract update(oldEntity: T, partialFields: Omit<T, keyof DbEntityData>): T
}