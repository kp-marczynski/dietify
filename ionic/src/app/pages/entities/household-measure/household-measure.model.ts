import { BaseEntity } from 'src/model/base-entity';
import { Product } from '../product/product.model';

export class HouseholdMeasure implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public gramsWeight?: number,
        public isVisible?: boolean,
        public product?: Product,
    ) {
        this.isVisible = false;
    }
}
