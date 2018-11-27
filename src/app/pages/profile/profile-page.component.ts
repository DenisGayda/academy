import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { IUser } from '../../model/user-profile.interface';
import { UserInDB } from '../../model/user-profile.class';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
    public userForm: FormGroup;
    public hiddenForm = false;
    public hiddenSuccessBlock: boolean;
    public userFromDB;

    constructor(private firebaseService: FirebaseService) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    public createForm(): void {
        this.userForm = new FormGroup({
            userName: new FormControl(null, null),
            userEmail: new FormControl(null, null),
            userAdress: new FormControl(null, Validators.required),
            userPhone: new FormControl(null, Validators.required),
        });
    }

    private showSuccessBlock(): void {
        const time = 3000;
        const component = this;
        setTimeout(() => {
            component.hiddenSuccessBlock = !component.hiddenSuccessBlock;
        }, time);
    }

    public createUserData(): void {
        this.hiddenSuccessBlock = false;

        const name = this.userForm.value.userName;
        const email = this.firebaseService.userEmail;
        const address = this.userForm.value.userAdress;
        const phone = this.userForm.value.userPhone;
        const newInfo: IUser = new UserInDB(name, email, address, phone);

        this.firebaseService.setDataInDatabase('/Users', this.firebaseService.userId, newInfo);

        this.showSuccessBlock();
    }

    public isReady(): boolean {
        if (this.userFromDB) {
            return true;
        }

        if (this.firebaseService.userId) {
            this.userFromDB = this.firebaseService.getCurrentUserFromDB();

            return true;
        }

        return false;
    }
}
