import { BaseEntity } from './../../shared';

export class SpokenLanguages implements BaseEntity {
    constructor(
        public id?: number,
        public countryCode?: string,
        public name?: string,
    ) {
    }
}
