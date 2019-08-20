import { Moment } from 'moment';
import { IBodyMeasurement } from 'app/shared/model/appointments/body-measurement.model';
import { INutritionalInterview } from 'app/shared/model/appointments/nutritional-interview.model';
import { IAssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';
import { IPatientCard } from 'app/shared/model/appointments/patient-card.model';

export const enum AppointmentState {
  PLANNED = 'PLANNED',
  CANCELED = 'CANCELED',
  COMPLETED = 'COMPLETED'
}

export interface IAppointment {
  id?: number;
  appointmentDate?: Moment;
  appointmentState?: AppointmentState;
  generalAdvice?: any;
  bodyMeasurement?: IBodyMeasurement;
  nutritionalInterview?: INutritionalInterview;
  mealPlans?: IAssignedMealPlan[];
  patientCard?: IPatientCard;
}

export class Appointment implements IAppointment {
  constructor(
    public id?: number,
    public appointmentDate?: Moment,
    public appointmentState?: AppointmentState,
    public generalAdvice?: any,
    public bodyMeasurement?: IBodyMeasurement,
    public nutritionalInterview?: INutritionalInterview,
    public mealPlans?: IAssignedMealPlan[],
    public patientCard?: IPatientCard
  ) {}
}
