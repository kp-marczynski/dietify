import { BaseEntity } from 'src/model/base-entity';
import { Appointment } from '../appointment/appointment.model';

export const enum SatisfactionRate {
    'VERY_DISSATISFIED',
    'DISSATISFIED',
    'NEUTRAL',
    'SATISFIED',
    'VERY_SATISFIED'
}

export class AppointmentEvaluation implements BaseEntity {
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
        public appointment?: Appointment,
    ) {
    }
}
