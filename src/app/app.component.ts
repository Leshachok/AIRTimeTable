import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { TimeTableService } from 'src/services/timetableservice';

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  
  title = 'AIRTable'
  botName = "ISHIRTestBot";

  isLoad: boolean = false;
  isLoadError: boolean = false;

  user: any = undefined;
  group: string = "УК211";
  groups: string[] = [];
  course: number = 1;
  courses: number[] = [1, 2, 3, 4];
  telegramID: number = 0
  editGroup: string = ""

  constructor(private service: TelegramLoginService, private ttservice: TimeTableService, private messageService: MessageService) {
    this.groups = ttservice.getGroupsByCourse(this.course)
  }

  ngOnInit() {

  }

  onLoad() {
    this.isLoad = true;
    if(this.service.getID() != 0) {
      this.ttservice.getEditGroupByTgID().subscribe(
        (response)=>{
            this.editGroup = response.data.group
            this.messageService.add({severity:'success', summary: 'Отримано доступ', detail: 'Ви маєте змогу редагувати розклад групи ' + this.editGroup});
        },
        (error)=>{
            console.log('Нельзя')
        }
      )
    }
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(user: any) {
    this.user = user;
    this.service.saveData(user);
    this.telegramID = user['id']
    //это убрать когда всех зарегаем
    this.ttservice.addGroupEditor()
    this.ttservice.getEditGroupByTgID().subscribe(
      (response)=>{
          this.editGroup = response.data.group
          this.messageService.add({severity:'success', summary: 'Отримано доступ', detail: 'Тепер ви маєте змогу редагувати розклад групи ' + this.editGroup});
      },
      (error)=>{
          console.log('Нельзя')
          this.messageService.add({severity:'warn', summary: 'Відмова в доступі', detail: 'Тепер ви маєте змогу редагувати розклад групи ' + this.editGroup});
      }
    )
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
