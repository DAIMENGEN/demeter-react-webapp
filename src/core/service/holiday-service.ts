import {BaseService} from "@D/core/service/service";
import {HolidayEntity} from "@D/core/entity/holiday-entity";
import {EntityData} from "@D/utils/entity/entity-data";
import {EntityDataFactory} from "@D/utils/entity/entity-data-factory";

export class HolidayService extends BaseService<HolidayEntity> {

    public create(partialFields: Omit<HolidayEntity, keyof EntityData>): HolidayEntity {
        return EntityDataFactory.create<HolidayEntity>(HolidayEntity, partialFields);
    }

    public update(oldHoliday: HolidayEntity, partialFields: Omit<HolidayEntity, keyof EntityData>): HolidayEntity {
        return EntityDataFactory.update(HolidayEntity, oldHoliday, partialFields);
    }

    public createHolidayRequest(holiday: HolidayEntity, callback: (holiday: HolidayEntity) => void): void {
        const URL = "/createHolidayRoute";
        this.post<HolidayEntity>(URL, holiday).then(callback);
    }

    public createHolidaysRequest(holidays: Array<HolidayEntity>, callback: (holidays: Array<HolidayEntity>) => void): void {
        const URL = "/createHolidaysRoute";
        this.post<Array<HolidayEntity>>(URL, holidays).then(callback)
    }

    public deleteHolidaysRequest(callback: (deletedHolidays: Array<HolidayEntity>) => void): void {
        const URL = "/deleteHolidaysRoute";
        this.post<Array<HolidayEntity>>(URL).then(callback);

    }

    public deleteHolidayByIdRequest(holidayId: string, callback: (deletedHoliday: HolidayEntity) => void): void {
        const URL = "/deleteHolidayByIdRoute";
        this.post<HolidayEntity>(URL, {holidayId}).then(callback);
    }

    public deleteHolidayByIdsRequest(holidayIds: Array<string>, callback: (deletedHolidays: Array<HolidayEntity>) => void): void {
        const URL = "/deleteHolidayByIdsRoute";
        this.post<Array<HolidayEntity>>(URL, {holidayIds}).then(callback);
    }

    public updateHolidayRequest(holiday: HolidayEntity, callback: (updatedHoliday: HolidayEntity) => void): void {
        const URL = "/updateHolidayRoute";
        this.put<HolidayEntity>(URL, holiday).then(callback);
    }

    public updateHolidaysRequest(holidays: Array<HolidayEntity>, callback: (updatedHoliday: Array<HolidayEntity>) => void): void {
        const URL = "/updateHolidaysRoute";
        this.put<Array<HolidayEntity>>(URL, holidays).then(callback);
    }

    public getHolidaysRequest(callback: (holidays: Array<HolidayEntity>) => void): void {
        const URL = "/getHolidaysRoute";
        this.get<Array<HolidayEntity>>(URL).then(callback);
    }

    public getNationalHolidaysRequest(callback: (holidays: Array<HolidayEntity>) => void): void {
        const URL = "/getNationalHolidaysRoute";
        this.get<Array<HolidayEntity>>(URL).then(callback);
    }

    public getCompanyHolidaysRequest(callback: (holidays: Array<HolidayEntity>) => void): void {
        const URL = "/getCompanyHolidaysRoute";
        this.get<Array<HolidayEntity>>(URL).then(callback);
    }

    public getSpecialWorkdaysRequest(callback: (holidays: Array<HolidayEntity>) => void): void {
        const URL = "/getSpecialWorkdaysRoute";
        this.get<Array<HolidayEntity>>(URL).then(callback);
    }
}