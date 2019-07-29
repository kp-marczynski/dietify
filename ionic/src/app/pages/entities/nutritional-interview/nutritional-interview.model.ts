import { BaseEntity } from 'src/model/base-entity';
import { OwnedKitchenAppliance } from '../owned-kitchen-appliance/owned-kitchen-appliance.model';
import { CustomNutritionalInterviewQuestion } from '../custom-nutritional-interview-question/custom-nutritional-interview-question.model';
import { Appointment } from '../appointment/appointment.model';

export const enum PhysicalActivity {
    'EXTREMELY_INACTIVE',
    'SEDENTARY',
    'MODERATELY_ACTIVE',
    'VIGOROUSLY_ACTIVE',
    'EXTREMELY_ACTIVE'
}

export const enum JobType {
    'SITTING',
    'STANDING',
    'MIXED'
}

export class NutritionalInterview implements BaseEntity {
    constructor(
        public id?: number,
        public completionDate?: any,
        public targetWeight?: number,
        public advicePurpose?: any,
        public physicalActivity?: PhysicalActivity,
        public diseases?: any,
        public medicines?: any,
        public jobType?: JobType,
        public likedProducts?: any,
        public dislikedProducts?: any,
        public foodAllergies?: any,
        public foodIntolerances?: any,
        public ownedKitchenAppliances?: OwnedKitchenAppliance[],
        public customQuestions?: CustomNutritionalInterviewQuestion[],
        public appointment?: Appointment,
    ) {
    }
}
