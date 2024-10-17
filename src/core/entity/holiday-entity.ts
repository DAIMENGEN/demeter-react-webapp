import {DbEntityData} from "@D/utils/database/db-entity-data";
import {HolidayType} from "@D/core/constant/holiday-type";
import {CountryCode} from "@D/core/constant/country-code";

export interface IHolidayEntity extends DbEntityData {
    title: string;
    holidayDate: string;
    holidayType: HolidayType;
    isRecurring: boolean;
    countryCode: CountryCode;
    description?: string;
}

export class HolidayEntity implements IHolidayEntity {
    id: string;
    title: string;
    holidayDate: string;
    holidayType: HolidayType;
    isRecurring: boolean;
    countryCode: CountryCode;
    creatorId: string;
    updaterId: string;
    createDateTime: string;
    updateDateTime: string;
    description?: string;

    constructor(
        id: string,
        title: string,
        holidayDate: string,
        holidayType: HolidayType,
        isRecurring: boolean,
        countryCode: CountryCode,
        creatorId: string,
        updaterId: string,
        createDateTime: string,
        updateDateTime: string,
        description?: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.holidayDate = holidayDate;
        this.holidayType = holidayType;
        this.isRecurring = isRecurring;
        this.countryCode = countryCode;
        this.creatorId = creatorId;
        this.updaterId = updaterId;
        this.createDateTime = createDateTime;
        this.updateDateTime = updateDateTime;
    }
}