import { Component, OnInit } from '@angular/core';
import { TimeTableService } from 'src/services/timetableservice';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.scss']
})
export class AddDialogComponent implements OnInit {

  private group: string = '' 
  public room: string = ''
  public type: string = ''
  public subject: string = ''
  public day: number = 0
  public pair: boolean = true
  public pair_num: number = 0
  private lecturers: string[] = []
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

  constructor(private service: TimeTableService) {
    this.group = service.getEditGroup()
    this.days = [...this.daysMap.keys()]
    this.types = [...this.typesMap.keys()]
  }

  ngOnInit(): void {

  }

}
