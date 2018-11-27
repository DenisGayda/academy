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
    public user: IUser;

    constructor(private firebaseService: FirebaseService) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    public createForm(): void {
        const maxNameLength = 100;
        this.userForm = new FormGroup({
            userName: new FormControl(),
            userEmail: new FormControl(),
            userAdress: new FormControl(),
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

    public createUserData(): void {
        this.hiddenSuccessBlock = false;

        const name = this.userForm.get('userName').value || this.user.name;
        const email = this.userForm.get('userEmail').value || this.user.email;
        const address = this.userForm.get('userAdress').value || this.user.adress;
        const phone = this.userForm.get('userPhone').value || this.user.phone;

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

            this.userFromDB.subscribe(user => {
                if (user) {
                    this.user = new UserInDB(user.name, user.email, user.adress, user.phone, user.photoURL);
                }
            });

            return true;
        }

        return false;
    }
}
