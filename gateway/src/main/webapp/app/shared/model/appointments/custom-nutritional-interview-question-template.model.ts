export interface ICustomNutritionalInterviewQuestionTemplate {
  id?: number;
  ownerId?: number;
  question?: any;
  language?: string;
}

export class CustomNutritionalInterviewQuestionTemplate implements ICustomNutritionalInterviewQuestionTemplate {
  constructor(public id?: number, public ownerId?: number, public question?: any, public language?: string) {}
}
