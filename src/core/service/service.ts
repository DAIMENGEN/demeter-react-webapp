import {HttpClient} from "@D/http/http-client";
import {EntityData} from "@D/utils/entity/entity-data";

export interface Service<T> {

    create(partialFields: Omit<T, keyof EntityData>): T;

    update(oldEntity: T, partialFields: Omit<T, keyof EntityData>): T;

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

    parseResponseError(error: Error): string {
        return this.httpClient.parseResponseError(error);
    }

    abstract create(partialFields: Omit<T, keyof EntityData>): T

    abstract update(oldEntity: T, partialFields: Omit<T, keyof EntityData>): T
}