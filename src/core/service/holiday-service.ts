import {BaseService} from "@D/core/service/service";
import {UserEntity} from "@D/core/entity/user-entity";
import {HolidayEntity} from "@D/core/entity/holiday-entity";
import {DbEntityData} from "@D/utils/database/db-entity-data";
import {DbEntityDataFactory} from "@D/utils/database/db-entity-data-factory";

export class HolidayService extends BaseService<HolidayEntity> {

    private currentUser: UserEntity;

    constructor(currentUser: UserEntity) {
        super();
        this.currentUser = currentUser;
    }

    public create(partialFields: Omit<HolidayEntity, keyof DbEntityData>): HolidayEntity {
        const userId = this.currentUser.id;
        return DbEntityDataFactory.create<HolidayEntity>(userId, HolidayEntity, partialFields);
    }

    public update(oldHoliday: HolidayEntity, partialFields: Omit<HolidayEntity, keyof DbEntityData>): HolidayEntity {
        const userId = this.currentUser.id;
        return DbEntityDataFactory.update(userId, HolidayEntity, oldHoliday, partialFields);
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