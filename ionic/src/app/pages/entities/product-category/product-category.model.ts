import { BaseEntity } from 'src/model/base-entity';
import { ProductCategoryTranslation } from '../product-category-translation/product-category-translation.model';

export class ProductCategory implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public translations?: ProductCategoryTranslation[],
    ) {
    }
}
