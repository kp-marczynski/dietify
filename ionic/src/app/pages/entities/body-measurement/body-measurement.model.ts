import { BaseEntity } from 'src/model/base-entity';
import { Appointment } from '../appointment/appointment.model';

export class BodyMeasurement implements BaseEntity {
    constructor(
        public id?: number,
        public completionDate?: any,
        public height?: number,
        public weight?: number,
        public waist?: number,
        public percentOfFatTissue?: number,
        public percentOfWater?: number,
        public muscleMass?: number,
        public physicalMark?: number,
        public calciumInBones?: number,
        public basicMetabolism?: number,
        public metabolicAge?: number,
        public visceralFatLevel?: number,
        public appointment?: Appointment,
    ) {
    }
}
