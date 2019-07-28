import { BaseEntity } from 'src/model/base-entity';
import { Appointment } from '../appointment/appointment.model';

export class AssignedMealPlan implements BaseEntity {
    constructor(
        public id?: number,
        public mealPlanId?: number,
        public appointment?: Appointment,
    ) {
    }
}
