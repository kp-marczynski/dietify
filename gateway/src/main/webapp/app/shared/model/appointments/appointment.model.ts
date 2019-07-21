import { Moment } from 'moment';
import { IAssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';

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
  patientCardId?: number;
  bodyMeasurementId?: number;
  nutritionalInterviewId?: number;
  mealPlans?: IAssignedMealPlan[];
}

export class Appointment implements IAppointment {
  constructor(
    public id?: number,
    public appointmentDate?: Moment,
    public appointmentState?: AppointmentState,
    public mealPlanId?: number,
    public generalAdvice?: any,
    public patientCardId?: number,
    public bodyMeasurementId?: number,
    public nutritionalInterviewId?: number,
    public mealPlans?: IAssignedMealPlan[]
  ) {}
}
