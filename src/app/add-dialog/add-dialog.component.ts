import { Component, OnInit } from '@angular/core';
import { TimeTableService } from 'src/services/timetableservice';
import { NewPair, Pair } from '../request/request';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  public pair: NewPair = new NewPair([], [], '', '', [], 0, 0, '')
  private group: string = '' 
  public room: string = ''
  public subject: string = ''
  public day: number = 0
  public is_pair: boolean = true
  public pair_num: number = 0
  private lecturers: string[] = []
  public type: string = ''
  public types: string[] = []
  private typesMap: Map<string, string> = new Map([
    ["Лабораторна", 'lab'],
    ["Лекція", 'lecture'],
    ["Практика", 'practice'],
  ]) 
  public days: string[] = []
  private daysMap: Map<string, number> = new Map([
    ["Понеділок", 1],
    ["Вівторок", 2],
    ["Среда", 3],
    ["Четвер", 4],
    ["П'ятниця", 5],
  ])

  constructor(private service: TimeTableService,private ref: DynamicDialogRef) {
    this.group = service.getEditGroup()
    this.days = [...this.daysMap.keys()]
    this.types = [...this.typesMap.keys()]
  }

  ngOnInit(): void {

  }

  close(){
    //this.pair = NewPair(this.lecturers, [this.group], this.subject, this.room, , d)
    
    this.ref.close(this.pair)
  }
}
