import { BaseEntity } from 'src/model/base-entity';
import { DietType } from '../diet-type/diet-type.model';

export class DietTypeTranslation implements BaseEntity {
    constructor(
        public id?: number,
        public translation?: string,
        public language?: string,
        public dietType?: DietType,
    ) {
    }
}
