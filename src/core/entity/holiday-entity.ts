import {EntityData} from "@D/utils/entity/entity-data";
import {HolidayType} from "@D/core/constant/holiday-type";
import {CountryCode} from "@D/core/constant/country-code";

export interface IHolidayEntity extends EntityData {
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
    description?: string;

    constructor(
        id: string,
        title: string,
        holidayDate: string,
        holidayType: HolidayType,
        isRecurring: boolean,
        countryCode: CountryCode,
        description?: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.holidayDate = holidayDate;
        this.holidayType = holidayType;
        this.isRecurring = isRecurring;
        this.countryCode = countryCode;
    }
}