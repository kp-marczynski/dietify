import { BaseEntity } from 'src/model/base-entity';
import { ProductCategory } from '../product-category/product-category.model';

export class ProductCategoryTranslation implements BaseEntity {
    constructor(
        public id?: number,
        public translation?: string,
        public language?: string,
        public productCategory?: ProductCategory,
    ) {
    }
}
