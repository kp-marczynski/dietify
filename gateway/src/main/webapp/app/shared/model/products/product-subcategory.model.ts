export interface IProductSubcategory {
  id?: number;
  description?: string;
  categoryDescription?: string;
  categoryId?: number;
}

export class ProductSubcategory implements IProductSubcategory {
  constructor(public id?: number, public description?: string, public categoryDescription?: string, public categoryId?: number) {}
}
