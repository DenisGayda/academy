import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class FirebaseService {
  private _dataInDatabase: Observable<{}[]>;
  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) { }

  public get dataInDatabase(): Observable<{}[]> {
    return this._dataInDatabase = this.db.list('/Contents').valueChanges();
  }

  public setDataInDatabase(url: string, key: string, value: {}): void {
    this.db.list(url).update(key, value);
  }

  public removeDataInDatabase(url: string, key: string): void {
    this.db.list(url).remove(key);
  }

  public updateDataInDatabase(url: string, key: string, value: {}): void {
    this.db.list(url).update(key, value);
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

  public login(email: string, password: string): Promise<{}> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public signup(email: string, password: string): Promise<{}> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  public get user(): Observable<User> {
    return this.afAuth.user;
  }
}
