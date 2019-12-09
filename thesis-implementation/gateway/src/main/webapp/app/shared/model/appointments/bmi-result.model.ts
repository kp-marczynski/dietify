import { Moment } from 'moment';

export interface IBmiResult {
  date?: Moment;
  bmi?: number;
}

export class BmiResult implements IBmiResult {
  constructor(public date?: Moment, public bmi?: number) {}
}
