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
  public types: string[] = ['lab', 'lecture', 'practice']

  constructor(private service: TimeTableService) {
    this.group = service.getEditGroup()
  }

  ngOnInit(): void {
  }

}
