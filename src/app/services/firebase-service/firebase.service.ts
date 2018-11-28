import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase';
import { Observable } from 'rxjs/internal/Observable';
import { IUser } from '../../model/user-profile.interface';
import {UserInDB} from '../../model/user-profile.class';

@Injectable()
export class FirebaseService {
    private _dataInDatabase: Observable<{}[]>;
    private _dataInUsers: Observable<{}>;
    private _userId: string;
    private _userEmail: string;
    private _currentUser: AngularFireObject<IUser>;

    constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this._userId = user.uid;
                this._userEmail = user.email;
            }
        });
    }

    public get user(): Observable<User> {
        return this.afAuth.user;
    }

    public get userId(): string {
        return this._userId;
    }

    public get userEmail(): string {
        return this._userEmail;
    }

    public get currentUser(): AngularFireObject<IUser> {
        return this._currentUser;
    }

    public get dataInDatabase(): Observable<{}[]> {
        return this._dataInDatabase = this.db.list('/Titles').valueChanges();
    }

    public get dataInUsers(): Observable<{}> {
        return this._dataInUsers = this.db.list('/Users').valueChanges();
    }

    public setDataInDatabase(url: string, key: string, value: IUser): void {
        this.db.list(url).set(key, value);
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
        const promise: Promise<{}> = this.afAuth.auth.createUserWithEmailAndPassword(email, password);

        this.createUserInDB();

        return promise;
    }

    public getCurrentUserFromDB(): Observable<IUser> {
        if (!this._userId) { return null; }

        this._currentUser = this.db.object(`Users/${this._userId}`);

        return this._currentUser.valueChanges();
    }

    private createUserInDB(): void {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                const userInDB: IUser = new UserInDB('', user.email, '', '');
                this.db.list('/Users').set(user.uid, userInDB);
            }
        });
    }
}
