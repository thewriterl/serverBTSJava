import { BaseEntity } from './../../shared';

export class ProductionCountries implements BaseEntity {
    constructor(
        public id?: number,
        public countryCode?: string,
        public name?: string,
    ) {
    }
}
