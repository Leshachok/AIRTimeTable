import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WidgetConfiguration } from 'angular-telegram-login-widget/lib/types';
import { MenuItem, MessageService } from 'primeng/api';
import { Day, Division } from 'src/request/request';
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

  user: any = undefined
  
  divisionName: string = ""
  divisionId: string = ""
  telegramID: number = 0
  editDivision: string = ""

  weeks = ["current", "next"]
  selectedWeek = "Поточний тиждень"
  selectedWeekNumber = 0
  mapWeekUkEn: Map<string, string> = new Map([
    ["Поточний тиждень", "current"],
    ["Наступний тиждень", "next"],
  ])


  onServerError = false
  days: Day[] = []
  days_enum: Array<string> = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"]
  courses = [1, 2, 3, 4]

  items: MenuItem[] = [];
  weekItems: MenuItem[] = [];

  config: WidgetConfiguration = {
        buttonStyle: 'large',
        showUserPhoto: true,
        cornerRadius: 50,
        accessToWriteMessages: true
  };
  
  constructor(public service: TelegramLoginService, private ttservice: TimeTableService,
     private messageService: MessageService,
     private router: Router, private cdr: ChangeDetectorRef
     ) { }
  

     ngOnInit() {
      
      this.weeks = [...this.mapWeekUkEn.keys()]
    
      if(window.innerWidth < 600){
        this.config.buttonStyle = "small"
        this.config.showUserPhoto = false
      }

      this.divisionName = this.ttservice.getLastSelectedGroup()
      this.divisionId = this.ttservice.getLastSelectedGroupId()

      this.weeks.forEach((week)=> {this.weekItems.push({label: week, command: event => this.setWeek(week)})})
      this.items = [{label: this.divisionName, items: []}, {label: this.selectedWeek, items: this.weekItems}]
      
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

      this.days_enum.forEach((weekday, index)=>{
        this.days.push(new Day(weekday, []))
        this.days[index].weekday = weekday
      })
      //this.editDivision = this.ttservice.getEditGroup()
      this.getPairs()
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
      this.divisionName = division.name
      this.divisionId = division.id
      this.items[0].label = this.divisionName
      this.ttservice.setLastSelectedGroup(division.name)
      this.ttservice.setLastSelectedGroupId(division.id)
      this.getPairs()
    }

    setWeek(week: string){
      this.selectedWeek = week
      this.items[1].label = this.selectedWeek
      this.getPairs()
    }

    getPairs(){
      let week = this.mapWeekUkEn.get(this.selectedWeek)!!
      this.ttservice.getPairs(this.divisionId, week).subscribe(
        (response) => {
          // тут в pairs записываются пары
          this.selectedWeekNumber = response.week

          let pairs = response.lessons
          pairs = pairs.sort((a, b) => a.day - b.day)
          this.days.forEach((day)=>{
            day.pairs = []
          })
          pairs.forEach((pair) => {
            this.days[pair.day-1].pairs.push(pair)
  
            // if(pair.link.length){
            //   pair.link_icon = "assets/img/custom.jpg";
            //   [...this.mapDomenIcon.keys()].forEach((key) => {
            //     if(pair.link.includes(key)){
            //       pair.link_icon = this.mapDomenIcon.get(key)!!
            //     }
            //   })
            // }
          })
  
          // this.days.forEach( (day) => {
          //   day.pairs.forEach( (pair) => {
          //     pair.timestamp -= 7200
          //     let date = new Date(pair.timestamp * 1000)
          //     let begin_time = this.datepipe.transform(date, 'HH:mm')
          //     let end_date = new Date(pair.timestamp * 1000 + 5700000)
          //     let end_time = this.datepipe.transform(end_date, 'HH:mm')
          //     pair.time = begin_time + " - " + end_time
              
  
          //   })
          // })
  
        },
        (error) => {
          console.error('There was an error!', error)
          this.onServerError = true
        },
        () => {
          let message = this.selectedWeekNumber % 2 ? 'Непарний' : "Парний"
          this.messageService.add({severity:'success', summary: `${this.selectedWeekNumber}, ${message}`, detail: 'Ви обрали тиждень'});
        }
      
      )
    }

  
}


