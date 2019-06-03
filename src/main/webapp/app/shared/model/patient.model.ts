import { Moment } from 'moment';
import { IPatientCard } from 'app/shared/model/patient-card.model';

export const enum Gender {
    FEMALE = 'FEMALE',
    MALE = 'MALE',
    OTHER = 'OTHER'
}

export interface IPatient {
    id?: number;
    userId?: number;
    gender?: Gender;
    dateOfBirth?: Moment;
    preferableLanguageId?: number;
    patientCards?: IPatientCard[];
}

export class Patient implements IPatient {
    constructor(
        public id?: number,
        public userId?: number,
        public gender?: Gender,
        public dateOfBirth?: Moment,
        public preferableLanguageId?: number,
        public patientCards?: IPatientCard[]
    ) {}
}
