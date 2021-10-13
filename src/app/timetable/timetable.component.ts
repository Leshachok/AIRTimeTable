import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { pairs } from 'rxjs';
import { TimeTableService } from 'src/services/timetableservice';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit, OnChanges {

  //тут номер группы хранится
  @Input() group: string = ""

  //тут както пары хранятся
  pairs: string[] = []

  constructor(private service: TimeTableService) { }

  ngOnInit() { }


  ngOnChanges(changes: SimpleChanges){
    if(!changes.group.isFirstChange()){
      console.log(changes.group.currentValue);
      this.service.getPairs(this.group).subscribe(
        (respones) => {
          let json = respones 
          // тут в pairs записываются пары
          this.pairs = ["dsdsdsd", "sdsdsd", "sdsdsd"]
        },
        (error) => {
            console.error('There was an error!', error)
            this.pairs = ["first", "second", "third"]
        }
      )
    }
  }


}