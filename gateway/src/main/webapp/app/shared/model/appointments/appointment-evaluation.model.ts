import { IAppointment } from 'app/shared/model/appointments/appointment.model';

export const enum SatisfactionRate {
  VERY_DISSATISFIED = 'VERY_DISSATISFIED',
  DISSATISFIED = 'DISSATISFIED',
  NEUTRAL = 'NEUTRAL',
  SATISFIED = 'SATISFIED',
  VERY_SATISFIED = 'VERY_SATISFIED'
}

export interface IAppointmentEvaluation {
  id?: number;
  overallSatisfaction?: SatisfactionRate;
  dietitianServiceSatisfaction?: SatisfactionRate;
  mealPlanOverallSatisfaction?: SatisfactionRate;
  mealCostSatisfaction?: SatisfactionRate;
  mealPreparationTimeSatisfaction?: SatisfactionRate;
  mealComplexityLevelSatisfaction?: SatisfactionRate;
  mealTastefulnessSatisfaction?: SatisfactionRate;
  dietaryResultSatisfaction?: SatisfactionRate;
  comment?: any;
  appointment?: IAppointment;
}

export class AppointmentEvaluation implements IAppointmentEvaluation {
  constructor(
    public id?: number,
    public overallSatisfaction?: SatisfactionRate,
    public dietitianServiceSatisfaction?: SatisfactionRate,
    public mealPlanOverallSatisfaction?: SatisfactionRate,
    public mealCostSatisfaction?: SatisfactionRate,
    public mealPreparationTimeSatisfaction?: SatisfactionRate,
    public mealComplexityLevelSatisfaction?: SatisfactionRate,
    public mealTastefulnessSatisfaction?: SatisfactionRate,
    public dietaryResultSatisfaction?: SatisfactionRate,
    public comment?: any,
    public appointment?: IAppointment
  ) {}
}
