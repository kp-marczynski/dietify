import { INutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';

export interface ICustomNutritionalInterviewQuestion {
  id?: number;
  ordinalNumber?: number;
  question?: any;
  answer?: any;
  nutritionalInterview?: INutritionalInterview;
}

export class CustomNutritionalInterviewQuestion implements ICustomNutritionalInterviewQuestion {
  constructor(
    public id?: number,
    public ordinalNumber?: number,
    public question?: any,
    public answer?: any,
    public nutritionalInterview?: INutritionalInterview
  ) {}
}
