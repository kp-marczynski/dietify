import { BaseEntity } from 'src/model/base-entity';
import { ProductCategory } from '../product-category/product-category.model';

export class ProductSubcategory implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public category?: ProductCategory,
    ) {
    }
}
