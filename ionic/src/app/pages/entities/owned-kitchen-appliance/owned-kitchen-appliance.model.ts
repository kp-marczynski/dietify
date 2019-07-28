import { BaseEntity } from 'src/model/base-entity';
import { NutritionalInterview } from '../nutritional-interview/nutritional-interview.model';

export class OwnedKitchenAppliance implements BaseEntity {
    constructor(
        public id?: number,
        public kitchenApplianceId?: number,
        public nutritionalInterview?: NutritionalInterview,
    ) {
    }
}
