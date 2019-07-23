import { Moment } from 'moment';
import { IAppointment } from 'app/shared/model/appointments/appointment.model';

export interface IPatientCard {
  id?: number;
  creationDate?: Moment;
  dietitianId?: number;
  patientId?: number;
  appointments?: IAppointment[];
}

export class PatientCard implements IPatientCard {
  constructor(
    public id?: number,
    public creationDate?: Moment,
    public dietitianId?: number,
    public patientId?: number,
    public appointments?: IAppointment[]
  ) {}
}
