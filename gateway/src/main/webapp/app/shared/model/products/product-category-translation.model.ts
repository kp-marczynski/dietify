export interface IProductCategoryTranslation {
  id?: number;
  translation?: string;
  language?: string;
  productCategoryDescription?: string;
  productCategoryId?: number;
}

export class ProductCategoryTranslation implements IProductCategoryTranslation {
  constructor(
    public id?: number,
    public translation?: string,
    public language?: string,
    public productCategoryDescription?: string,
    public productCategoryId?: number
  ) {}
}
