import { BaseEntity } from 'src/model/base-entity';
import { KitchenApplianceTranslation } from '../kitchen-appliance-translation/kitchen-appliance-translation.model';

export class KitchenAppliance implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public translations?: KitchenApplianceTranslation[],
    ) {
    }
}
