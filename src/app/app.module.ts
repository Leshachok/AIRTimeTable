import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularTelegramLoginWidgetModule } from 'angular-telegram-login-widget';
import { CookieService } from 'ngx-cookie-service';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimetableComponent } from './timetable/timetable.component';
import { TimeTableService } from 'src/services/timetableservice';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule} from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MenubarModule } from 'primeng/menubar';
import { DropdownModule } from 'primeng/dropdown';
import { ScrollingModule } from '@angular/cdk/scrolling'

@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent,
    EditDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularTelegramLoginWidgetModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    DynamicDialogModule,
    MenubarModule,
    DropdownModule,
    ScrollingModule
  ],
  providers: [
    TelegramLoginService,
    CookieService,
    TimeTableService,
    ConfirmationService,
    MessageService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
