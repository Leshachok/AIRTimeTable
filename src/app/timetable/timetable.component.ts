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
  currentTime = 0;
  
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
    this.currentTime = Date.now()/1000
  }


  openLink(url: string){
    window.open(url)
  }
}
