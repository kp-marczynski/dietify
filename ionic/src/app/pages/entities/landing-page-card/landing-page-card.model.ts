import { BaseEntity } from 'src/model/base-entity';

export class LandingPageCard implements BaseEntity {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public htmlContent?: any,
        public cardImageContentType?: string,
        public cardImage?: any,
    ) {
    }
}
