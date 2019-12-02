import { IAppointment } from 'app/shared/model/appointments/appointment.model';
import { Moment } from 'moment';

export interface IAssignedMealPlan {
  id?: number;
  mealPlanId?: number;
  appointment?: IAppointment;
  assigmentTime?: Moment;
}

export class AssignedMealPlan implements IAssignedMealPlan {
  constructor(public id?: number, public mealPlanId?: number, public appointment?: IAppointment, public assigmentTime?: Moment) {}
}
