import { Moment } from 'moment';
import { IAppointment } from 'app/shared/model/appointments/appointment.model';

export const enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER'
}

export interface IPatientCard {
  id?: number;
  creationDate?: Moment;
  dietitianId?: number;
  patientId?: number;
  appointments?: IAppointment[];
  patientLastName?: string;
  patientFirstName?: string;
  patientGender?: Gender;
  patientEmail?: string;
  patientPhone?: string;
  patientDateOfBirth?: Moment;
  additionalPatientInfo?: string;
}

export class PatientCard implements IPatientCard {
  constructor(
    public id?: number,
    public creationDate?: Moment,
    public dietitianId?: number,
    public patientId?: number,
    public appointments?: IAppointment[],
    public patientLastName?: string,
    public patientFirstName?: string,
    public patientGender?: Gender,
    public patientEmail?: string,
    public patientPhone?: string,
    public patientDateOfBirth?: Moment,
    public additionalPatientInfo?: string
  ) {}
}
