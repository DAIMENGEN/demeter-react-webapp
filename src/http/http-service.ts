import {HttpClient} from "@D/http/http-client.ts";
import {HttpPayload} from "@D/http/http-payload.ts";
import {SnowflakeIdUtil} from "@D/utils/snowflake/snowflake-id-util.ts";

export interface IHttpService<T> {

    create(partialFields: Omit<T, keyof HttpPayload>): T;

    update(oldData: T, partialFields: Omit<T, keyof HttpPayload>): T;

}

export abstract class HttpService<T> implements IHttpService<T> {

    // private adminId: string = "1";

    private httpClient: HttpClient = new HttpClient();

    public abstract create(partialFields: Omit<T, keyof HttpPayload>): T;

    public update(oldData: T, partialFields: Omit<T, keyof HttpPayload>): T {
        return {...oldData, ...partialFields}
    }

    public generateId(): string {
        return SnowflakeIdUtil.nextId().toString();
    }

    public parseResponseError(error: Error): string {
        return this.httpClient.parseResponseError(error);
    }

    public get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
        return this.httpClient.get<T>(url, params);
    }

    public put<T>(url: string, params?: Record<string, unknown>): Promise<T> {
        return this.httpClient.put<T>(url, params);
    }

    public post<T>(url: string, params?: Record<string, unknown>): Promise<T> {
        return this.httpClient.post<T>(url, params);
    }
}