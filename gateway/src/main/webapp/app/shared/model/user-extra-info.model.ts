import { Moment } from 'moment';

export const enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER'
}

export interface IUserExtraInfo {
  id?: number;
  gender?: Gender;
  dateOfBirth?: Moment;
  phoneNumber?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  personalDescription?: any;
  userLogin?: string;
  userId?: number;
}

export class UserExtraInfo implements IUserExtraInfo {
  constructor(
    public id?: number,
    public gender?: Gender,
    public dateOfBirth?: Moment,
    public phoneNumber?: string,
    public streetAddress?: string,
    public postalCode?: string,
    public city?: string,
    public country?: string,
    public personalDescription?: any,
    public userLogin?: string,
    public userId?: number
  ) {}
}
