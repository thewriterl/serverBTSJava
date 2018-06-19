import { BaseEntity } from './../../shared';

export class ProductionCompany implements BaseEntity {
    constructor(
        public id?: number,
        public logoPath?: string,
        public logoURLContentType?: string,
        public logoURL?: any,
        public name?: string,
        public country?: string,
    ) {
    }
}
