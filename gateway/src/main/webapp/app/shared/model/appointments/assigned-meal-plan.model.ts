export interface IAssignedMealPlan {
  id?: number;
  mealPlanId?: number;
  appointmentId?: number;
}

export class AssignedMealPlan implements IAssignedMealPlan {
  constructor(public id?: number, public mealPlanId?: number, public appointmentId?: number) {}
}
