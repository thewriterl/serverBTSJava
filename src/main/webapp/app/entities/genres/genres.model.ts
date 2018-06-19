import { BaseEntity } from './../../shared';

export class Genres implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
