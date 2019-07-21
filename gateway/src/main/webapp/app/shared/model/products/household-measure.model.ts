export interface IHouseholdMeasure {
  id?: number;
  description?: string;
  gramsWeight?: number;
  isVisible?: boolean;
  productDescription?: string;
  productId?: number;
}

export class HouseholdMeasure implements IHouseholdMeasure {
  constructor(
    public id?: number,
    public description?: string,
    public gramsWeight?: number,
    public isVisible?: boolean,
    public productDescription?: string,
    public productId?: number
  ) {
    this.isVisible = this.isVisible || false;
  }
}
