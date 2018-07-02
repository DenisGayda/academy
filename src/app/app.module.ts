import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { RoutingModule } from './routing.module';
import { FooterModule } from './footer/footer.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './components/header/header.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RoutingModule,
    FooterModule,
    HeaderModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent],
})

export class AppModule { }
