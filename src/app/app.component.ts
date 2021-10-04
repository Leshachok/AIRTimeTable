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
  username: string = 'none';
  botName = "ISHIRTestBot";
  
  constructor(private service: TelegramLoginService){
    this.username = service.getData();
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
    this.username = this.service.getData()
  }
}
