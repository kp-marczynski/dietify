export interface ICustomNutritionalInterviewQuestion {
  id?: number;
  ordinalNumber?: number;
  question?: any;
  answer?: any;
  nutritionalInterviewId?: number;
}

export class CustomNutritionalInterviewQuestion implements ICustomNutritionalInterviewQuestion {
  constructor(
    public id?: number,
    public ordinalNumber?: number,
    public question?: any,
    public answer?: any,
    public nutritionalInterviewId?: number
  ) {}
}
