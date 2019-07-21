import { IPatientCard } from 'app/shared/model/patient-card.model';

export interface IDietetician {
    id?: number;
    userId?: number;
    patientcards?: IPatientCard[];
}

export class Dietetician implements IDietetician {
    constructor(public id?: number, public userId?: number, public patientcards?: IPatientCard[]) {}
}
