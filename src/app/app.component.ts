import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TelegramLoginService } from 'src/services/telegramloginservice';

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AIRTable'
  isLoad: boolean = false;
  isLoadError: boolean = false;
  user: any = undefined;
  tgService: TelegramLoginService | undefined;
  username: string = 'none';

  init(service: TelegramLoginService){
    this.tgService = service;
    this.username = service.getData();
  }

  botName = "ISHIRTestBot";

  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(user: any) {
    this.user = user;
    this.username = user['username'] as string
    this.tgService?.saveData(user);
  }
}
