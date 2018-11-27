import { IUser } from './user-profile.interface';

export class UserInDB implements IUser {
    constructor(public name: string, public email: string, public adress: string, public phone: string, public photoURL: string) {}
}
