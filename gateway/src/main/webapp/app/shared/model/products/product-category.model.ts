import { IProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';

export interface IProductCategory {
  id?: number;
  description?: string;
  translations?: IProductCategoryTranslation[];
}

export class ProductCategory implements IProductCategory {
  constructor(public id?: number, public description?: string, public translations?: IProductCategoryTranslation[]) {}
}
