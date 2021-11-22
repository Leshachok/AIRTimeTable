import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { TimeTableService } from 'src/services/timetableservice';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  botName = "OdesaPolytechnicBot";

  isLoad: boolean = false;
  isLoadError: boolean = false;

  user: any = undefined;
  group: string = "";
  telegramID: number = 0
  editGroup: string = ""

	items: MenuItem[] = [];
	firstGroupItems: MenuItem[] = [];
	secondGroupItems: MenuItem[] = [];
	thirdGroupItems: MenuItem[] = [];
	fourthGroupItems: MenuItem[] = [];

  constructor(public service: TelegramLoginService, private ttservice: TimeTableService,
     private messageService: MessageService,
     private router: Router
     ) { }

     ngOnInit() {
      this.group = this.ttservice.getLastSelectedGroup()
      this.editGroup = this.ttservice.getEditGroup()
      this.ttservice.map.get(1)!!.map((group) => this.firstGroupItems.push({label: group, command: event => this.setGroup(group)}));
      this.ttservice.map.get(2)!!.map((group)  => this.secondGroupItems.push({label: group, command: event => this.setGroup(group)}))
      this.ttservice.map.get(3)!!.map((group)  => this.thirdGroupItems.push({label: group, command: event => this.setGroup(group)}))
      this.ttservice.map.get(4)!!.map((group)  => this.fourthGroupItems.push({label: group, command: event => this.setGroup(group)}))
      this.items = [
        {
          label: this.group,
          items: [
              {
                label: "1 курс",
                items: this.firstGroupItems
              },
              {
                label: '2 курс',
                items: this.secondGroupItems
              }, 
              {
              label: "3 курс",
                items: this.thirdGroupItems
              }, 
              {
              label: "4 курс",
                items: this.fourthGroupItems
              }
          ]
        }, 
      ]
    }
  
    handleClick(){
      this.router.navigate(['/admin'])
    }
  
    onLoad() {
      this.isLoad = true;
      if(this.service.getID() != 0) {
        this.ttservice.getEditGroupByTgID().subscribe(
          (response)=>{
              this.editGroup = response.data.group
              this.ttservice.setEditGroup(this.editGroup)
              this.messageService.add({severity:'success', summary: 'Є доступ', detail: 'Ви маєте змогу редагувати розклад групи ' + this.editGroup});
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

      this.ttservice.getEditGroupByTgID().subscribe(
        (response)=>{
            this.editGroup = response.data.group
            this.ttservice.setEditGroup(this.editGroup)
            this.messageService.add({severity:'success', summary: 'Отримано доступ', detail: 'Тепер ви маєте змогу редагувати розклад групи ' + this.editGroup});
        },
        (error)=>{
            console.log('Нельзя')
            this.messageService.add({severity:'warn', summary: 'Відмова в доступі', detail: 'У вас нема доступу редагування груп' + this.editGroup});
        }
      )
    }
  
    
    getGroups(course: number): string[] {
      return this.ttservice.getGroupsByCourse(course); 
    }
  
  
    setGroup(group: string) {
      this.group = group
      this.items[0].label = group
    }

}
