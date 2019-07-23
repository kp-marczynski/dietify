import { Moment } from 'moment';
import { IBodyMeasurment } from 'app/shared/model/body-measurment.model';
import { IPatientCard } from 'app/shared/model/patient-card.model';

export const enum AppointmentState {
    PLANNED = 'PLANNED',
    CANCELED = 'CANCELED',
    COMPLETED = 'COMPLETED'
}

export interface IAppointment {
    id?: number;
    appointmentDate?: Moment;
    appointmentState?: AppointmentState;
    mealPlanId?: number;
    generalAdvice?: any;
    bodyMeasurment?: IBodyMeasurment;
    patientCard?: IPatientCard;
}

export class Appointment implements IAppointment {
    constructor(
        public id?: number,
        public appointmentDate?: Moment,
        public appointmentState?: AppointmentState,
        public mealPlanId?: number,
        public generalAdvice?: any,
        public bodyMeasurment?: IBodyMeasurment,
        public patientCard?: IPatientCard
    ) {}
}
