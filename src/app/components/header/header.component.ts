import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase-service/firebase.service';

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
    {name: 'Тесты', url: '#'},
    {name: 'Личный кабинет', url: '/profile'},
  ];
  public txtEmail = '';
  public txtPassword = '';
  public user;
  public errorEmailExist = false;
  public errorWrongPassword = false;
  public emailSearcher: FormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}'),
  ]);
  public passwordSearcher: FormControl = new FormControl ('', [
    Validators.required,
    Validators.pattern('[0-9a-zA-Z!@#$%^&*]{6,}'),
  ]);
  public myForm: FormGroup = new FormGroup({
    email: this.emailSearcher,
    password: this.passwordSearcher,
  });
  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.user = this.firebaseService.user;
    this.emailSearcher.valueChanges.subscribe(value => {
      this.errorEmailExist = false;
      this.txtEmail = value;
    });
    this.passwordSearcher.valueChanges.subscribe(value => {
      this.errorWrongPassword = false;
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
    const _errorCode = 'auth/wrong-password';
    const promise = this.firebaseService.login(this.txtEmail, this.txtPassword);
    promise
      .then(() => this.visibleLoginForm())
      .catch(e => {
        if (e.code === _errorCode) {
          this.errorWrongPassword = true;
        }
      });
  }

  public signup(): void {
    const _errorCode = 'auth/email-already-in-use';
    const promise = this.firebaseService.signup(this.txtEmail, this.txtPassword);
    promise
      .then(() => this.visibleLoginForm())
      .catch(e => {
        if (e.code === _errorCode) {
          this.errorEmailExist = true;
        }
      });
  }

}
