import { BaseEntity } from './../../shared';

export class Films implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public posterContentType?: string,
        public poster?: any,
        public adult?: boolean,
        public budget?: string,
        public popularity?: number,
        public releaseDate?: any,
        public revenue?: number,
        public runtime?: number,
        public status?: string,
        public rating?: number,
        public directors?: BaseEntity[],
        public genres?: BaseEntity[],
        public productionCountries?: BaseEntity[],
        public spokenLanguages?: BaseEntity[],
        public posts?: BaseEntity[],
        public actors?: BaseEntity[],
        public productionCompanies?: BaseEntity[],
    ) {
        this.adult = false;
    }
}
