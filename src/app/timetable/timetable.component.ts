import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Day, Pair } from '../../request/request';
import { HostListener } from "@angular/core";

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent {

  //тут номер группы хранится
  @Input() tgID: number = 0

  //тут както пары хранятся
  @Input() days: Day[] = []
  deleteId: number = 0
  @Input() editAllowGroup: string = ''
  @Input() onServerError = false

  room:string = '';
  subject:string = '';
  time:string ='';
  currentDay = 0;
  currentTime = "";

  
  screenWidth: number = 0;
  live_image:string = "assets/img/live.svg"

  mapDomenIcon: Map<string, string> = new Map([
    ["meet.google.com", "assets/img/gmeet.svg"],
    ["zoom.us", "assets/img/zoom.svg"],
    ["teams.microsoft.com", "assets/img/teams.svg"],
  ])

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.screenWidth = window.innerWidth;
  }

  constructor() { 
    this.onResize();
    let date = new Date()
    this.currentDay = date.getDay()
    //this.currentTime = date.toISOString().substr(11, 5)
    if(date.getHours() < 10 ){
      if(date.getMinutes() < 10 ){
        this.currentTime = "0"+date.getHours() +":0"+date.getMinutes();
      }
      else{
        this.currentTime = "0"+date.getHours() +":"+date.getMinutes();
      }
    }
    else{
      if(date.getMinutes() < 10 ){
        this.currentTime = date.getHours() +":0"+date.getMinutes();
      }
      else{
        this.currentTime = date.getHours() +":"+date.getMinutes();
      }
    }
  }

  isLive(day:number,start:string,end:string,currentDay:number,currentTime:string):boolean{
    console.log(currentTime)
    if(day == currentDay && start < currentTime && end > currentTime){
      return true
    }
    return false
  }

  openLink(url: string){
    window.open(url)
  }
}
