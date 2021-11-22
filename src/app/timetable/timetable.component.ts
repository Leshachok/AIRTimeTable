import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { TimeTableService } from 'src/services/timetableservice';
import { Day } from '../../request/request';
import { HostListener } from "@angular/core";
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit, OnChanges {

  //тут номер группы хранится
  @Input() group: string = "УК211"
  @Input() tgID: number = 0

  //тут както пары хранятся
  pairs: Day[] = []
  days: Array<string> = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"]
  deleteId: number = 0
  @Input() editAllowGroup: string = ''
  onDeleted = false
  add_pair_dialog_visible = false
  onServerError = false

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
    this.getPairs()
    this.days.map((value)=> new Date(value))
    this.currentTime = Date.now()/1000
  }


  ngOnChanges(changes: SimpleChanges){
      if (changes.group){ 
        this.getPairs()
        this.service.setLastSelectedGroup(changes.group.currentValue)
      }     
  }



  getPairs(){
    this.service.getPairs(this.group).subscribe(
      (response) => {

        // тут в pairs записываются пары
        this.pairs = response.data
        this.pairs.forEach( (day) => {
          day.pairs.forEach( (pair) => {
            pair.timestamp -= 7200
            let date = new Date(pair.timestamp * 1000)
            let begin_time = this.datepipe.transform(date, 'HH:mm')
            let end_date = new Date(pair.timestamp * 1000 + 5700000)
            let end_time = this.datepipe.transform(end_date, 'HH:mm')
            pair.time = begin_time + " - " + end_time
            if(pair.link.length){
              pair.link_icon = "assets/img/custom.jpg";
              [...this.mapDomenIcon.keys()].forEach((key) => {
                if(pair.link.includes(key)){
                  pair.link_icon = this.mapDomenIcon.get(key)!!
                }
              })
            }

          })
        })

      },
      (error) => {
        console.error('There was an error!', error)
        this.onServerError = true
        this.pairs = []
      }
    
    )
  }

  openLink(url: string){
    window.open(url)
  }
}
