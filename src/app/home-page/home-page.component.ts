import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public txtEmail = '';
  public txtPassword = '';
  public emailSearcher: FormControl;
  public passwordSearcher: FormControl;

  constructor(public afAuth: AngularFireAuth) {
  }

  ngOnInit(): void {
    this.emailSearcher = new FormControl('');
    this.passwordSearcher = new FormControl('');
    this.emailSearcher.valueChanges.subscribe(value => {
      this.txtEmail = value;
    });
    this.passwordSearcher.valueChanges.subscribe(value => {
      this.txtPassword = value;
    });
  }

  public loginWithGoogle(): void {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public loginWithGithub(): void {
    this.afAuth.auth.signInWithPopup(new auth.GithubAuthProvider());
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  public login(): void {
    const promise = this.afAuth.auth.signInWithEmailAndPassword(this.txtEmail, this.txtPassword);
    promise.catch(e => {
      throw new Error(e);
    });
  }

  public signup(): void {
    const promise = this.afAuth.auth.createUserWithEmailAndPassword(this.txtEmail, this.txtPassword);
    promise.catch(e => {
      throw new Error(e);
    });
  }
}
