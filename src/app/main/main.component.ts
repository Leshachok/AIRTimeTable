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
  botName = "UniveraTimetableBot";

  isLoad: boolean = false;
  isLoadError: boolean = false;

  user: any = undefined
  
  accessGroup: string = ""
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
  days_enum: Array<string> = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
  courses = [1, 2, 3, 4]
  isLoggedIn = false

  items: MenuItem[] = [];
  weekItems: MenuItem[] = [];

  pairNumbers = [1, 2, 3, 4]

  mapDomenIcon: Map<string, string> = new Map([
    ["meet.google.com", "assets/img/gmeet.svg"],
    ["zoom.us", "assets/img/zoom.svg"],
    ["teams.microsoft.com", "assets/img/teams.svg"],
  ])

  config: WidgetConfiguration = {
    buttonStyle: 'large',
    showUserPhoto: true,
    cornerRadius: 50,
    accessToWriteMessages: true
  };
  
  constructor(public telegramLoginService: TelegramLoginService, private timetableService: TimeTableService,
    private messageService: MessageService,
    private router: Router, private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.weeks = [...this.mapWeekUkEn.keys()]
    this.days_enum.forEach((weekday, index)=>{
      this.days.push(new Day(weekday, []))
      this.days[index].weekday = weekday
    })

    this.getPreferences()
    this.fillUI()
    this.customizeTGWidget()
  }

  getPreferences(){
    this.divisionName = this.timetableService.getLastSelectedGroup()
    this.divisionId = this.timetableService.getLastSelectedGroupId()
    this.accessGroup = this.timetableService.getAccessGroup()
    if(this.accessGroup == "superadmin"){
      this.getDivisions()
    }else if(this.accessGroup == "admin"){
      let editDivisionId = this.timetableService.getEditDivisionId()
      this.getPairs(editDivisionId)
    }
  }

  fillUI(){
    this.weeks.forEach((week)=> {this.weekItems.push({label: week, command: event => this.setWeek(week)})})
    this.items = [{label: this.divisionName, items: []}, {label: this.selectedWeek, items: this.weekItems}]
  }

  customizeTGWidget(){
    if(window.innerWidth < 600){
      this.config.buttonStyle = "small"
      this.config.showUserPhoto = false
    }
  }

  handleClick(){
    this.router.navigate(['/admin'])
  }

  onLoad() {
    this.isLoad = true;
  }

  onLoadError() {
    this.isLoadError = true;
  }

  onLogin(user: any) {
    this.user = user;
    this.telegramLoginService.saveData(user);
    this.telegramLoginService.login(user).subscribe(
      (response) => {
        this.telegramLoginService.saveAccessToken(response.accessToken)

        let account = response.account
        console.log(response.account)
        console.log(response.account?.division)
        if(account != undefined && account.accessGroups.includes("superadmin")){
          this.loginSuperAdmin()
          return;
        }
        else if(account != undefined && account.accessGroups.includes("admin")){
          this.loginAdmin(account.division!!)
          return;
        }
        else{
          this.messageService.add({ severity:'warning', summary: `Помилка`, detail: 'Немає прав на редагування!'});
          return
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  loginSuperAdmin(){
    this.getDivisions()
    this.timetableService.saveAccessGroup("superadmin")
    this.messageService.add({ severity:'success', summary: `Ви залогінілись`, detail: 'Маєте права для редагування всіх груп!'});
    this.isLoggedIn = true
  }

  loginAdmin(division: Division){
    this.timetableService.setEditGroup(division)
    this.timetableService.saveAccessGroup("admin")
    this.messageService.add({ severity:'success', summary: `Ви залогінілись`, detail: `Маєте права для редагування групи ${division.name}!`});
    this.isLoggedIn = true

    
    let menuitems: MenuItem[] = [];
    menuitems.push({label: division.name, command: event => this.setDivision(division)});
    this.items[0].items!!.push({label: division.course + ' курс', items: menuitems})
  }


  setDivision(division: Division) {
    this.divisionName = division.name
    this.divisionId = division.id
    this.items[0].label = this.divisionName
    this.timetableService.setLastSelectedGroup(division.name)
    this.timetableService.setLastSelectedGroupId(division.id)
    this.getPairs()
  }

  setWeek(week: string){
    this.selectedWeek = week
    this.items[1].label = this.selectedWeek
    this.getPairs()
  }

  getDivisions(){
    this.timetableService.getDivisions().subscribe((response)=>{
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
  }

  getPairs(divisionId: string = this.divisionId){
    let week = this.mapWeekUkEn.get(this.selectedWeek)!!
    this.timetableService.getPairs(divisionId, week).subscribe(
      (response) => {
        // тут в pairs записываются пары
        this.selectedWeekNumber = response.week

        let pairs = response.lessons
        pairs = pairs.sort((a, b) => a.day - b.day)
        this.days.forEach((day)=>{
          day.pairs = []
        })
        pairs.forEach((pair) => {
          if(pair.start.length == 4) pair.start = '0' + pair.start
          if(pair.end.length == 4) pair.end = '0' + pair.end
          this.days[pair.day-1].pairs.push(pair)
          
          if(pair.link){
            pair.icon = "assets/img/custom.jpg";
            [...this.mapDomenIcon.keys()].forEach((key) => {
              if(pair.link.includes(key)){
                pair.icon = this.mapDomenIcon.get(key)!!
              }
            })
          }
        })

        this.days.forEach((day) => {
          day.pairs.sort((a, b) => a!.number - b!.number)
        })
        this.days.forEach(day => {
          this.pairNumbers.forEach(number => {
            if(day.pairs.find(pair => pair?.number == number) == undefined){
              day.pairs.splice(number-1, 0, null)
            }
          })
        })

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

  isLive(day:string, start:number, end:number, currentDay:string, currentTime:number):boolean {
    if(day == currentDay && start < currentTime && end > currentTime){
      return true
    }
    return false
  }

  handleLogoClick(){
    window.open("https://univera.app")
    console.log( "lol")
  }
}


