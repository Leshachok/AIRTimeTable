import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Division } from 'src/request/request';
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
  division: string = "";
  divisionId: string = ""
  telegramID: number = 0
  editDivision: string = ""

	items: MenuItem[] = [];
  courses = [1, 2, 3, 4]

  constructor(public service: TelegramLoginService, private ttservice: TimeTableService,
     private messageService: MessageService,
     private router: Router
     ) { }

     ngOnInit() {

      this.division = this.ttservice.getLastSelectedGroup()
      this.items = [{label: this.division, items: []}]
      this.ttservice.getDivisions().subscribe((response)=>{
          this.courses.forEach((num)=>{
            let filter = response.filter(division => division.course == num)
            let menuitems: MenuItem[] = [];
            filter.forEach((division)=> menuitems.push({label: division.name, command: event => this.setDivision(division)}))
            this.items[0].items!!.push({label: num + ' курс', items: menuitems})
          })
        
      },
      (error)=>{
        console.log(error)
      })

      this.editDivision = this.ttservice.getEditGroup()
    }
  
    handleClick(){
      this.router.navigate(['/admin'])
    }
  
    onLoad() {
      this.isLoad = true;
      if(this.service.getID() != 0) {
        this.ttservice.getEditGroupByTgID().subscribe(
          (response)=>{
              this.editDivision = response.data.group
              this.ttservice.setEditGroup(this.editDivision)
              this.messageService.add({severity:'success', summary: 'Є доступ', detail: 'Ви маєте змогу редагувати розклад групи ' + this.editDivision});
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
            this.editDivision = response.data.group
            this.ttservice.setEditGroup(this.editDivision)
            this.messageService.add({severity:'success', summary: 'Отримано доступ', detail: 'Тепер ви маєте змогу редагувати розклад групи ' + this.editDivision});
        },
        (error)=>{
            console.log('Нельзя')
            this.messageService.add({severity:'warn', summary: 'Відмова в доступі', detail: 'У вас нема доступу редагування груп' + this.editDivision});
        }
      )
    }
  
  
    setDivision(division: Division) {
      this.division = division.name
      this.divisionId = division.id
      this.items[0].label = this.division
      this.ttservice.setLastSelectedGroup(division.name)
    }

}
