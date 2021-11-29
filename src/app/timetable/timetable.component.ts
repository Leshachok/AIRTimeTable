import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { TimeTableService } from 'src/services/timetableservice';
import { Day, Pair } from '../../request/request';
import { HostListener } from "@angular/core";
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit {

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

  constructor(private service: TimeTableService, private TgService: TelegramLoginService,
       private confService: ConfirmationService, private messageService: MessageService, private dialogService: DialogService,
       public datepipe: DatePipe) { 
    this.tgID = TgService.getID()
    this.onResize();
  }

  ngOnInit() {
    //initializing array of pairs

    
    //time in seconds
    this.currentTime = Date.now()/1000

    //console.log(new Date(this.currentTime*1000).getDay() - 1)
    // this.days_enum.map((value)=> new Date(value))

  }


  openLink(url: string){
    window.open(url)
  }
}
