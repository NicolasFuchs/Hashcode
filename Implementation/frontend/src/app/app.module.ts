import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppComponent} from './app.component';
import {PersonComponent} from './component/person/person.component';
import {AppRoutingModule} from './app-routing.module';
import {PersonService} from './service/person.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './component/header/header.component';
import {AuthenticationInterceptor} from './interceptor/authentication.interceptor';
import {AuthenticationService} from './service/authentication.service';
import {HomeComponent} from './component/home/home.component';

import {ConfirmComponent} from './component/confirm/confirm.component';
import {ChallengesListComponent} from './component/challenges-list/challenges-list.component';

import {ChallengesComponent} from './component/challenges/challenges.component';
import {ChallengeDetailsComponent} from './component/challenge-details/challenge-details.component';
import {NgxLocalStorageModule} from 'ngx-localstorage';


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    HeaderComponent,
    HomeComponent,
    ConfirmComponent,
    ChallengesListComponent,
    ChallengesComponent,
    ChallengeDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgxLocalStorageModule.forRoot({prefix: 'hashcode'})
  ],
  providers: [PersonService,
    AuthenticationService,
    AuthenticationInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useExisting: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
