export interface IDishTypeTranslation {
  id?: number;
  translation?: string;
  language?: string;
  dishTypeDescription?: string;
  dishTypeId?: number;
}

export class DishTypeTranslation implements IDishTypeTranslation {
  constructor(
    public id?: number,
    public translation?: string,
    public language?: string,
    public dishTypeDescription?: string,
    public dishTypeId?: number
  ) {}
}
