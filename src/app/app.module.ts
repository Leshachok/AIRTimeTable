import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularTelegramLoginWidgetModule } from 'angular-telegram-login-widget';
import { CookieService } from 'ngx-cookie-service';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimetableComponent } from './timetable/timetable.component';
import { TimeTableService } from 'src/services/timetableservice';
<<<<<<< HEAD
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';

=======
import { DialogModule } from 'primeng/dialog';
>>>>>>> bbbe316cd38641b07db502cde91635062de9d8ac

@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularTelegramLoginWidgetModule,
    HttpClientModule,
<<<<<<< HEAD
    BrowserAnimationsModule,
    DialogModule
=======
    DialogModule,
    BrowserAnimationsModule
>>>>>>> bbbe316cd38641b07db502cde91635062de9d8ac
  ],
  providers: [
    TelegramLoginService,
    CookieService,
    TimeTableService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
