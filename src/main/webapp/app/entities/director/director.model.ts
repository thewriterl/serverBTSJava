import { BaseEntity } from './../../shared';

export class Director implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
