import { BaseEntity } from 'src/model/base-entity';
import { NutritionalInterview } from '../nutritional-interview/nutritional-interview.model';

export class CustomNutritionalInterviewQuestion implements BaseEntity {
    constructor(
        public id?: number,
        public ordinalNumber?: number,
        public question?: any,
        public answer?: any,
        public nutritionalInterview?: NutritionalInterview,
    ) {
    }
}
