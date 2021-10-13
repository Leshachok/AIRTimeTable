import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TimeTableService } from 'src/services/timetableservice';
import { Pair } from '../request/request';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit, OnChanges {

  //тут номер группы хранится
  @Input() group: string = ""

  //тут както пары хранятся
  pairs: Pair[] = []
  days: string[] = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"]

  constructor(private service: TimeTableService) { }

  ngOnInit() { }


  ngOnChanges(changes: SimpleChanges){
    if(!changes.group.isFirstChange()){
      console.log(changes.group.currentValue);
      this.service.getPairs(this.group).subscribe(
        (respones) => {
          let json = respones 
          // тут в pairs записываются пары
          this.pairs = [
              new Pair("Технології розроблення ПП", "204ф", 234234, []),
              new Pair("Бази даних", "409ф", 234234, []),
              new Pair("Програмування", "411ф", 234234, []),
          ]
        },
        (error) => {
            console.error('There was an error!', error)
            this.pairs = []
        }
      )
    }
  }


}