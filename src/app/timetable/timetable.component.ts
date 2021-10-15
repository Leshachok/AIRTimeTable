import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { TimeTableService } from 'src/services/timetableservice';
import { Day, Pair, PairResponse } from '../request/request';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit, OnChanges {

  //тут номер группы хранится
  @Input() group: string = ""
  @Input() tgID: number = 0

  //тут както пары хранятся
  pairs: Day[] = []
  days: string[] = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"]
 

  constructor(private service: TimeTableService, private TgService: TelegramLoginService) { 
    this.tgID = TgService.getID()
  }

  ngOnInit() { }


  ngOnChanges(changes: SimpleChanges){
    if(!changes.group.isFirstChange()){
      console.log(changes.group.currentValue);
      this.service.getPairs(this.group).subscribe(
        (response) => {
          console.log(response.data);
          
          // тут в pairs записываются пары
          this.pairs = response.data
        },
        (error) => {
            console.error('There was an error!', error)
            this.pairs = []
        }
      ) 
      this.tgID = this.TgService.getID()
    }
  }

  onEditPair(){
    alert('Вы точно хотите изменить пару?')
  }

  onDeletePair(){
    alert('Вы точно хотите удалить пару?')
  }

  edit_image:string ="assets/img/edit.png";
  delete_image:string ="assets/img/delete.png"
}