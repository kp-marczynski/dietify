import { BaseEntity } from 'src/model/base-entity';

export class CustomNutritionalInterviewQuestionTemplate implements BaseEntity {
    constructor(
        public id?: number,
        public ownerId?: number,
        public question?: any,
        public language?: string,
    ) {
    }
}
