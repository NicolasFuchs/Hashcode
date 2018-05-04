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


@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot()
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
