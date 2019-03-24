import { IProductSubcategory } from 'app/shared/model/product-subcategory.model';

export interface IProductCategory {
    id?: number;
    descriptionPolish?: string;
    descriptionEnglish?: string;
    subcategories?: IProductSubcategory[];
}

export class ProductCategory implements IProductCategory {
    constructor(
        public id?: number,
        public descriptionPolish?: string,
        public descriptionEnglish?: string,
        public subcategories?: IProductSubcategory[]
    ) {}
}
