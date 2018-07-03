import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _dataInDatabase: Observable<{}[]>;
  constructor(private db: AngularFireDatabase) { }

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
}
