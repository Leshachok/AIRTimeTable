import { Component, OnInit } from '@angular/core';
import { TimeTableService } from 'src/services/timetableservice';
import { NewPair, Pair } from '../request/request';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

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
  public day: string = ''
  //кожного тижня, непарна, парна
  public weeks_type: string[] = []
  public week: string = 'Кожного тижня' 
  public weeks: number[] = [] 
  public pair_num: number = 1
  public pair_nums: number[] = [1, 2, 3, 4]
  private lecturers: string[] = []
  public type: string = 'Лабораторна'
  public types: string[] = []
  public link: string = ''
  private typesMap: Map<string, string> = new Map([
    ["Лабораторна", 'lab'],
    ["Лекція", 'lecture'],
    ["Практика", 'practice'],
  ]) 
  public days: string[] = []
  private daysMap: Map<string, number> = new Map([
    ["Понеділок", 1],
    ["Вівторок", 2],
    ["Середа", 3],
    ["Четвер", 4],
    ["П'ятниця", 5],
  ])
  private weeksMap: Map<string, number[]> = new Map([
    ["Кожного тижня", [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]],
    ["Парна", [2,4,6,8,10,12,14,16]],
    ["Непарна", [1,3,5,7,9,11,13,15]],
  ])
  


  constructor(private service: TimeTableService,private ref: DynamicDialogRef, private messageService: MessageService) {
    this.group = service.getEditGroup()
    this.days = [...this.daysMap.keys()]
    this.types = [...this.typesMap.keys()]
    this.weeks_type = [...this.weeksMap.keys()]
  }

  ngOnInit(): void {

  }

  close(){
    if(!(this.room.length && this.subject.length)){
      this.messageService.add({severity:'warn', summary: 'Увага', detail: 'Заповніть всі поля!'});
      return
    }
    this.pair = new NewPair(this.lecturers, [this.group], this.subject, this.room, this.weeksMap.get(this.week)!!, this.daysMap.get(this.day)!!, this.pair_num, this.typesMap.get(this.type)!!)
    console.log(this.pair)
    
    this.ref.close([this.pair])
  }
}
