import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
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
  public emailSearcher: FormControl = new FormControl('');
  public passwordSearcher: FormControl = new FormControl('');

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.user = this.firebaseService.checkUser();
    this.emailSearcher.valueChanges.subscribe(value => {
      this.txtEmail = value;
    });
    this.passwordSearcher.valueChanges.subscribe(value => {
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
    this.firebaseService.login(this.txtEmail, this.txtPassword);
    this.visibleLoginForm();
  }

  public signup(): void {
    this.firebaseService.signup(this.txtEmail, this.txtPassword);
    this.visibleLoginForm();
  }
}
