import { BaseEntity } from './../../shared';

export class Posts implements BaseEntity {
    constructor(
        public id?: number,
        public postTitle?: string,
        public postContent?: string,
        public videoURL?: string,
        public imageURL?: string,
    ) {
    }
}
