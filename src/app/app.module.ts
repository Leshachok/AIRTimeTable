import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularTelegramLoginWidgetModule } from 'angular-telegram-login-widget';
import { CookieService } from 'ngx-cookie-service';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimetableComponent } from './timetable/timetable.component';

@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularTelegramLoginWidgetModule,
    HttpClientModule
  ],
  providers: [
    TelegramLoginService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
