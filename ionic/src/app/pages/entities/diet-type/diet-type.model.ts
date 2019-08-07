import { BaseEntity } from 'src/model/base-entity';
import { DietTypeTranslation } from '../diet-type-translation/diet-type-translation.model';

export class DietType implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public translations?: DietTypeTranslation[],
    ) {
    }
}
