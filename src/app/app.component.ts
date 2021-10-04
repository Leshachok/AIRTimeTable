import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

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

  botName = "ISHIRTestBot";

  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(user: any) {
    this.user = user;
  }
}
