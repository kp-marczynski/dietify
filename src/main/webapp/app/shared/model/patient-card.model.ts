import { Moment } from 'moment';
import { IPatient } from 'app/shared/model/patient.model';
import { IDietetician } from 'app/shared/model/dietetician.model';
import { IAppointment } from 'app/shared/model/appointment.model';

export interface IPatientCard {
    id?: number;
    creationDate?: Moment;
    patient?: IPatient;
    dietetician?: IDietetician;
    appointments?: IAppointment[];
}

export class PatientCard implements IPatientCard {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public patient?: IPatient,
        public dietetician?: IDietetician,
        public appointments?: IAppointment[]
    ) {}
}
