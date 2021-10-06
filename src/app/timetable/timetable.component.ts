import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  pairs: any[] = []

  constructor(private timeTableService: TimeTableService) { }

  ngOnInit(){
    
  }

  ngOnChanges(changes: SimpleChanges){
    if(changes.group){
      // timetable.getPairs
    }
  }


}