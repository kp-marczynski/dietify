import { IAppointment } from 'app/shared/model/appointments/appointment.model';

export interface IAssignedMealPlan {
  id?: number;
  mealPlanId?: number;
  appointment?: IAppointment;
}

export class AssignedMealPlan implements IAssignedMealPlan {
  constructor(public id?: number, public mealPlanId?: number, public appointment?: IAppointment) {}
}
