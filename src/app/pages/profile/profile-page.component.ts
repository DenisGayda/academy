import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { IUser } from '../../model/user-profile.interface';
import { UserInDB } from '../../model/user-profile.class';
import {Observable} from 'rxjs/internal/Observable';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
    private _userForm: FormGroup;
    private _hiddenSuccessBlock: boolean;
    private _userFromDB$: Observable<IUser>;
    private _user: IUser;

    constructor(private firebaseService: FirebaseService) {
    }

    ngOnInit(): void {
        this.userForm = this.createForm();
    }

    get userForm(): FormGroup {
        return this._userForm;
    }

    set userForm(value: FormGroup) {
        this._userForm = value;
    }

    get hiddenSuccessBlock(): boolean {
        return this._hiddenSuccessBlock;
    }

    set hiddenSuccessBlock(value: boolean) {
        this._hiddenSuccessBlock = value;
    }

    get userFromDB$(): Observable<IUser> {
        return this._userFromDB$;
    }

    set userFromDB$(value$: Observable<IUser>) {
        this._userFromDB$ = value$;
    }

    get user(): IUser {
        return this._user;
    }

    set user(value: IUser) {
        this._user = value;
    }

    public createForm(): FormGroup {
         return new FormGroup({
            userName: new FormControl(),
            userEmail: new FormControl(),
            userAddress: new FormControl(),
            userPhone: new FormControl(),
        });
    }

    private showSuccessBlock(): void {
        const time = 3000;
        const component = this;
        setTimeout(() => {
            component.hiddenSuccessBlock = !component.hiddenSuccessBlock;
        }, time);
    }

    public updateUserData(): void {
        this.hiddenSuccessBlock = false;

        const newInfo: IUser = this.getUserFormInfo();

        this.firebaseService.setDataInDatabase('/Users', this.firebaseService.userId, newInfo);

        this.showSuccessBlock();
    }

    public isReady(): boolean {
        if (this.userFromDB$) {
            return true;
        }

        if (this.firebaseService.userId) {
            this.userFromDB$ = this.firebaseService.getCurrentUserFromDB$();

            this.userFromDB$.subscribe(user => {
                if (user) {
                    this.user = new UserInDB(user.name, user.email, user.adress, user.phone, user.photoURL);
                }
            });

            return true;
        }

        return false;
    }

    public getUserFormInfo(): IUser {
        const name = this.userForm.get('userName').value || this.user.name;
        const email = this.userForm.get('userEmail').value || this.user.email;
        const address = this.userForm.get('userAddress').value || this.user.adress;
        const phone = this.userForm.get('userPhone').value || this.user.phone;

        return new UserInDB(name, email, address, phone);
    }
}
