import { IProductSubcategory } from 'app/shared/model/products/product-subcategory.model';
import { IProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';

export interface IProductCategory {
  id?: number;
  description?: string;
  subcategories?: IProductSubcategory[];
  translations?: IProductCategoryTranslation[];
}

export class ProductCategory implements IProductCategory {
  constructor(
    public id?: number,
    public description?: string,
    public subcategories?: IProductSubcategory[],
    public translations?: IProductCategoryTranslation[]
  ) {}
}
