import { IUser } from './user-profile.interface';

export class User implements IUser {
    constructor(public name: string, public email: string, public adress: string, public phone: string) {}
}
