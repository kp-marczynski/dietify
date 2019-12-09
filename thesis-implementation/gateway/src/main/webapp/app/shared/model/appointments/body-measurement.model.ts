import { Moment } from 'moment';
import { IAppointment } from 'app/shared/model/appointments/appointment.model';

export interface IBodyMeasurement {
  id?: number;
  completionDate?: Moment;
  height?: number;
  weight?: number;
  waist?: number;
  percentOfFatTissue?: number;
  percentOfWater?: number;
  muscleMass?: number;
  physicalMark?: number;
  calciumInBones?: number;
  basicMetabolism?: number;
  metabolicAge?: number;
  visceralFatLevel?: number;
  appointment?: IAppointment;
}

export class BodyMeasurement implements IBodyMeasurement {
  constructor(
    public id?: number,
    public completionDate?: Moment,
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
    public appointment?: IAppointment
  ) {}
}
