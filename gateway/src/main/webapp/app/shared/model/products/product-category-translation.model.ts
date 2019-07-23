import { IProductCategory } from 'app/shared/model/products/product-category.model';

export interface IProductCategoryTranslation {
  id?: number;
  translation?: string;
  language?: string;
  productCategory?: IProductCategory;
}

export class ProductCategoryTranslation implements IProductCategoryTranslation {
  constructor(public id?: number, public translation?: string, public language?: string, public productCategory?: IProductCategory) {}
}
