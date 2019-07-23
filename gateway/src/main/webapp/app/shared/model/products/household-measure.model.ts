import { IProduct } from 'app/shared/model/products/product.model';

export interface IHouseholdMeasure {
  id?: number;
  description?: string;
  gramsWeight?: number;
  isVisible?: boolean;
  product?: IProduct;
}

export class HouseholdMeasure implements IHouseholdMeasure {
  constructor(
    public id?: number,
    public description?: string,
    public gramsWeight?: number,
    public isVisible?: boolean,
    public product?: IProduct
  ) {
    this.isVisible = this.isVisible || false;
  }
}
