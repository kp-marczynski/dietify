import { Moment } from 'moment';
import { IOwnedKitchenAppliance } from 'app/shared/model/appointments/owned-kitchen-appliance.model';
import { ICustomNutritionalInterviewQuestion } from 'app/shared/model/appointments/custom-nutritional-interview-question.model';

export const enum PhysicalActivity {
  EXTREMELY_INACTIVE = 'EXTREMELY_INACTIVE',
  SEDENTARY = 'SEDENTARY',
  MODERATELY_ACTIVE = 'MODERATELY_ACTIVE',
  VIGOROUSLY_ACTIVE = 'VIGOROUSLY_ACTIVE',
  EXTREMELY_ACTIVE = 'EXTREMELY_ACTIVE'
}

export const enum JobType {
  SITTING = 'SITTING',
  STANDING = 'STANDING',
  MIXED = 'MIXED'
}

export interface INutritionalInterview {
  id?: number;
  completionDate?: Moment;
  targetWeight?: number;
  advicePurpose?: any;
  physicalActivity?: PhysicalActivity;
  diseases?: any;
  medicines?: any;
  jobType?: JobType;
  likedProducts?: any;
  dislikedProducts?: any;
  foodAllergies?: any;
  foodIntolerances?: any;
  appointmentId?: number;
  ownedKitchenAppliances?: IOwnedKitchenAppliance[];
  customQuestions?: ICustomNutritionalInterviewQuestion[];
}

export class NutritionalInterview implements INutritionalInterview {
  constructor(
    public id?: number,
    public completionDate?: Moment,
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
    public appointmentId?: number,
    public ownedKitchenAppliances?: IOwnedKitchenAppliance[],
    public customQuestions?: ICustomNutritionalInterviewQuestion[]
  ) {}
}
