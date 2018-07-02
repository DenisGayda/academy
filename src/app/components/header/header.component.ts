import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

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
  public emailSearcher: FormControl = new FormControl('');
  public passwordSearcher: FormControl = new FormControl('');

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
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
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.visibleLoginForm();
  }

  public loginWithGithub(): void {
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
    this.visibleLoginForm();
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  public login(): void {
    const promise = this.afAuth.auth.signInWithEmailAndPassword(this.txtEmail, this.txtPassword);
    promise.catch(e => {
      throw new Error(e);
    });
    this.visibleLoginForm();
  }

  public signup(): void {
    const promise = this.afAuth.auth.createUserWithEmailAndPassword(this.txtEmail, this.txtPassword);
    promise.catch(e => {
      throw new Error(e);
    });
    this.visibleLoginForm();
  }
}
