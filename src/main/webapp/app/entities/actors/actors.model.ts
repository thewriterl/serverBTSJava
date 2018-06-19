import { BaseEntity } from './../../shared';

export class Actors implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
    ) {
    }
}
