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
  group: string = "";
  course: string = "";
  listOfGroups: string[] = [];
  listOfCourses: number[] = [1,2,3,4];

  // тут должна быть привязка к группам из БД
  firstCourseGroups = ["SomeFirstGroup1", "SomeFirstGroup2", "SomeFirstGroup3", "SomeFirstGroup4"];
  secondCourseGroups = ["SomeSecondGroup1", "SomeSecondGroup2", "SomeSecondGroup3", "SomeSecondGroup4"];
  thirdCourseGroups = ["SomeThirdGroup1", "SomeThirdGroup2", "SomeThirdGroup3", "SomeThirdGroup4"];
  fourthCourseGroups = ["SomeFourthGroup1", "SomeFourthGroup2", "SomeFourthGroup3", "SomeFourthGroup4"];

  constructor(private service: TelegramLoginService){
  }

  onButtonClick(){
    this.group = 'UP191'
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

  getCourse(): string {
    console.log(this.course)
    return this.course;
  }

  getGroup(): string | undefined{
    return this.group;
  }

  getListOfGroups(course: string): string[] {
    let listOfGroups: string[] = [" "];
    if (course) {
      switch (course) {
        case "1": {
          listOfGroups = this.firstCourseGroups;
          break;
        }
        case "2": {
          listOfGroups = this.secondCourseGroups;
          break;
        }
        case "3": {
          listOfGroups = this.thirdCourseGroups;
          break;
        }
        case "4": {
          listOfGroups = this.fourthCourseGroups;
          break;
        }
      }
    }
    return listOfGroups;
  }

  setCourse(element: any) {
    let html: HTMLSelectElement = element as HTMLSelectElement;
    let value = html.value;
    this.course = value;
    this.listOfGroups=this.getListOfGroups(this.getCourse())
  }

  setGroup(element: any) {
    let html: HTMLSelectElement = element as HTMLSelectElement;
    let value = html.value;
    this.group = value;
  }

}
