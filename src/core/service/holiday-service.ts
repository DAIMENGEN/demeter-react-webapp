import {HolidayEntity} from "@D/core/entity/holiday-entity";
import {HttpService} from "@D/http/http-service.ts";
import {HttpPayload} from "@D/http/http-payload.ts";

export class HolidayService extends HttpService<HolidayEntity> {

    private static instance: HolidayService;

    public static getInstance(): HolidayService {
        if (!HolidayService.instance) {
            HolidayService.instance = new HolidayService();
        }
        return HolidayService.instance;
    }

    public create(partialFields: Omit<HolidayEntity, keyof HttpPayload>): HolidayEntity {
        const args: ConstructorParameters<typeof HolidayEntity> = [
            this.generateId(),
            partialFields.title,
            partialFields.holidayDate,
            partialFields.holidayType,
            partialFields.isRecurring,
            partialFields.countryCode,
            partialFields.description,
        ];
        return new HolidayEntity(...args);
    }

    public createHolidayRequest(holiday: HolidayEntity, success: (holiday: HolidayEntity) => void, failure?: (error: Error) => void): void {
        const URL = "/createHolidayRoute";
        this.post<HolidayEntity>(URL, {holiday}).then(success).catch(failure);
    }

    public createHolidaysRequest(holidays: Array<HolidayEntity>, success: (holidays: Array<HolidayEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/createHolidaysRoute";
        this.post<Array<HolidayEntity>>(URL, {holidays}).then(success).catch(failure);
    }

    public deleteHolidaysRequest(success: (deletedHolidays: Array<HolidayEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/deleteHolidaysRoute";
        this.post<Array<HolidayEntity>>(URL).then(success).catch(failure);

    }

    public deleteHolidayByIdRequest(holidayId: string, success: (deletedHoliday: HolidayEntity) => void, failure?: (error: Error) => void): void {
        const URL = "/deleteHolidayByIdRoute";
        this.post<HolidayEntity>(URL, {holidayId}).then(success).catch(failure);
    }

    public deleteHolidayByIdsRequest(holidayIds: Array<string>, success: (deletedHolidays: Array<HolidayEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/deleteHolidayByIdsRoute";
        this.post<Array<HolidayEntity>>(URL, {holidayIds}).then(success).catch(failure);
    }

    public updateHolidayRequest(holiday: HolidayEntity, success: (updatedHoliday: HolidayEntity) => void, failure?: (error: Error) => void): void {
        const URL = "/updateHolidayRoute";
        this.put<HolidayEntity>(URL, {holiday}).then(success).catch(failure);
    }

    public updateHolidaysRequest(holidays: Array<HolidayEntity>, success: (updatedHoliday: Array<HolidayEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/updateHolidaysRoute";
        this.put<Array<HolidayEntity>>(URL, {holidays}).then(success).catch(failure);
    }

    public getHolidaysRequest(success: (holidays: Array<HolidayEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/getHolidaysRoute";
        this.get<Array<HolidayEntity>>(URL).then(success).catch(failure);
    }

    public getNationalHolidaysRequest(success: (holidays: Array<HolidayEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/getNationalHolidaysRoute";
        this.get<Array<HolidayEntity>>(URL).then(success).catch(failure);
    }

    public getCompanyHolidaysRequest(success: (holidays: Array<HolidayEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/getCompanyHolidaysRoute";
        this.get<Array<HolidayEntity>>(URL).then(success).catch(failure);
    }

    public getSpecialWorkdaysRequest(success: (holidays: Array<HolidayEntity>) => void, failure?: (error: Error) => void): void {
        const URL = "/getSpecialWorkdaysRoute";
        this.get<Array<HolidayEntity>>(URL).then(success).catch(failure);
    }
}