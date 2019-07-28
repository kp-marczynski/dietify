import { BaseEntity } from 'src/model/base-entity';
import { Appointment } from '../appointment/appointment.model';

export class PatientCard implements BaseEntity {
    constructor(
        public id?: number,
        public creationDate?: any,
        public dietitianId?: number,
        public patientId?: number,
        public appointments?: Appointment[],
    ) {
    }
}
