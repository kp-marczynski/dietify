import { BaseEntity } from 'src/model/base-entity';
import { KitchenAppliance } from '../kitchen-appliance/kitchen-appliance.model';

export class KitchenApplianceTranslation implements BaseEntity {
    constructor(
        public id?: number,
        public translation?: string,
        public language?: string,
        public kitchenAppliance?: KitchenAppliance,
    ) {
    }
}
