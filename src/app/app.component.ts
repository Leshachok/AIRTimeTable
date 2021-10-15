import { Component } from '@angular/core';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { TimeTableService } from 'src/services/timetableservice';

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
  group: string = "";
  groups: string[] = [];
  course: number = 1;
  courses: number[] = [1, 2, 3, 4];
  telegramID: number = 0


  constructor(private service: TelegramLoginService, private ttservice: TimeTableService) {
    this.groups = ttservice.getGroupsByCourse(this.course)
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
    this.telegramID = user['id']
  }

  getGroups(course: number): string[] {
    return this.ttservice.getGroupsByCourse(course); 
  }

  setCourse(element: any) {
    let html: HTMLSelectElement = element as HTMLSelectElement;
    let value = html.value.charAt(0);
    this.course = +value;
    this.groups=this.getGroups(this.course)
    this.group = this.groups[0]
  }

  setGroup(element: any) {
    let html: HTMLSelectElement = element as HTMLSelectElement;
    let value = html.value;
    this.group = value;
  }

}
