import { BaseEntity } from 'src/model/base-entity';
import { BodyMeasurement } from '../body-measurement/body-measurement.model';
import { NutritionalInterview } from '../nutritional-interview/nutritional-interview.model';
import { AssignedMealPlan } from '../assigned-meal-plan/assigned-meal-plan.model';
import { PatientCard } from '../patient-card/patient-card.model';

export const enum AppointmentState {
    'PLANNED',
    'CANCELED',
    'COMPLETED'
}

export class Appointment implements BaseEntity {
    constructor(
        public id?: number,
        public appointmentDate?: any,
        public appointmentState?: AppointmentState,
        public generalAdvice?: any,
        public bodyMeasurement?: BodyMeasurement,
        public nutritionalInterview?: NutritionalInterview,
        public mealPlans?: AssignedMealPlan[],
        public patientCard?: PatientCard,
    ) {
    }
}
