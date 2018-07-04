import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase-service/firebase.service';
// import { ErrorStateMatcher } from '@angular/material/core';

interface ILinks {
  name: string;
  url: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public dropdownVisible = false;
  public loginFormVisible = false;
  public pagesLinks: ILinks[] = [
    {name: 'Главная', url: '/homepage'},
    {name: 'Содержание', url: '/contents'},
    {name: 'Тесты', url: '/exercises'},
    {name: 'Личный кабинет', url: '/profile'},
  ];
  public txtEmail = '';
  public txtPassword = '';
  public user;
  public errorEmailExist = false;
  public errorWrongPassword = false;
  public errorNotRegisteredUser = false;

  public myForm: FormGroup;
  // public matcher = new ErrorStateMatcher();

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}'),
      ]),
      password: new FormControl ('', [
        Validators.required,
        Validators.pattern('[0-9a-zA-Z!@#$%^&*]{6,}'),
      ]),
    });

    this.user = this.firebaseService.user;
    this.myForm.controls.email.valueChanges.subscribe(value => {
      this.errorEmailExist = false;
      this.errorWrongPassword = false;
      this.errorNotRegisteredUser = false;
      this.txtEmail = value;
    });
    this.myForm.controls.password.valueChanges.subscribe(value => {
      this.errorWrongPassword = false;
      this.errorNotRegisteredUser = false;
      this.errorEmailExist = false;
      this.txtPassword = value;
    });
  }

  public visibleDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  public choisePage(): void {
    this.dropdownVisible = false;
  }

  public visibleLoginForm(): void {
    this.loginFormVisible = !this.loginFormVisible;
    this.myForm.reset();
    this.errorEmailExist = false;
    this.errorWrongPassword = false;
    this.errorNotRegisteredUser = false;
  }

  public loginWithGoogle(): void {
    this.firebaseService.loginWithGoogle();
    this.visibleLoginForm();
  }

  public loginWithGithub(): void {
    this.firebaseService.loginWithGithub();
    this.visibleLoginForm();
  }

  public logout(): void {
    this.firebaseService.logout();
  }

  public login(): void {
    const _errorCodeWrongPassword = 'auth/wrong-password';
    const _errorCodeNotRegisteredUser = "auth/user-not-found";
    this.firebaseService.login(this.txtEmail, this.txtPassword)
      .then(() => this.visibleLoginForm())
      .catch(e => {
        if (e.code === _errorCodeWrongPassword) {
          this.myForm.reset();
          this.errorWrongPassword = true;
        }
        if (e.code === _errorCodeNotRegisteredUser) {
          this.myForm.reset();
          this.errorNotRegisteredUser = true;
        }
      });
  }

  public signup(): void {
    const _errorCode = 'auth/email-already-in-use';
    this.firebaseService.signup(this.txtEmail, this.txtPassword)
      .then(() => this.visibleLoginForm())
      .catch(e => {
        if (e.code === _errorCode) {
          this.myForm.reset();
          this.errorEmailExist = true;
        }
      });
  }
}
