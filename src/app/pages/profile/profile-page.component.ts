import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
import { IUser } from '../../model/user-profile.interface';
import { User } from '../../model/user-profile.class';

@Component({
    selector: 'app-profile-page',
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
    public userForm: FormGroup;
    public userName: string;
    public userEmail: string;
    public userAdress: string;
    public userPhone: string;
    public user;
    public count = 0;
    public hiddenForm = false;
    public hiddenSuccessBlock: boolean;

    constructor(private firebaseService: FirebaseService) {
    }

    ngOnInit(): void {
        this.firebaseService.dataInUsers.subscribe(data => {
            data.map((item, i) => {
                this.count = i + 2;
            });
        });
        this.user = this.firebaseService.user;
        this.createForm();
    }

    public generateIdForUser(): string {
        let id = '';
        id += this.count;

        return id;
    }

    public createForm(): void {
        this.userForm = new FormGroup({
            userName: new FormControl(null, null),
            userEmail: new FormControl(null,
                null),
            userAdress: new FormControl('', Validators.required),
            userPhone: new FormControl('+3', Validators.required),
        });
    }

    public showSuccessBlock(): void {
        const time = 3000;
        const component = this;
        setTimeout(() => {
            component.hiddenSuccessBlock = !component.hiddenSuccessBlock;
        }, time);
    }

    public createUserData(name: string, email: string): void {
        this.hiddenSuccessBlock = false;
        this.userName = this.userForm.value.userName;
        this.userEmail = this.userForm.value.userEmail;
        this.userAdress = this.userForm.value.userAdress;
        this.userPhone = this.userForm.value.userPhone;
        const userData: IUser = new User(name, email, this.userAdress, this.userPhone);
        this.firebaseService.setDataInDatabase('/Users', this.generateIdForUser(), userData);
        this.hiddenForm = !this.hiddenForm;
        this.showSuccessBlock();
    }
}
