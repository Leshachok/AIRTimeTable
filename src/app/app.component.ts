import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TelegramLoginService } from 'src/services/telegramloginservice';

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'AIRTable'
  botName = "ISHIRTestBot";

  isLoad: boolean = false;
  isLoadError: boolean = false;

  user: any = undefined;
  course: number = 1;
  group: string = "AI200"

  constructor(private service: TelegramLoginService){
  }


  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(user: any) {
    this.user = user;
    this.service.saveData(user);
  }
}
