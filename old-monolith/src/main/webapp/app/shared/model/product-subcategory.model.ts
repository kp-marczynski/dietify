import { IProductCategory } from 'app/shared/model/product-category.model';

export interface IProductSubcategory {
    id?: number;
    description?: string;
    category?: IProductCategory;
}

export class ProductSubcategory implements IProductSubcategory {
    constructor(public id?: number, public description?: string, public category?: IProductCategory) {}
}
