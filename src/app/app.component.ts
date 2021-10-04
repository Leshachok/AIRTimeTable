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
  userOutput = "";

  botName = "ISHIRTestBot";

  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(user: any) {
    this.userOutput = JSON.stringify(user, null, 4);
  }
}
