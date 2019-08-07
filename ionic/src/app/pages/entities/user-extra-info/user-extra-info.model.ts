import { BaseEntity } from 'src/model/base-entity';
import { User } from '../../../services/user/user.model';

export const enum Gender {
    'FEMALE',
    'MALE',
    'OTHER'
}

export class UserExtraInfo implements BaseEntity {
    constructor(
        public id?: number,
        public gender?: Gender,
        public dateOfBirth?: any,
        public phoneNumber?: string,
        public streetAddress?: string,
        public postalCode?: string,
        public city?: string,
        public country?: string,
        public personalDescription?: any,
        public user?: User,
    ) {
    }
}
