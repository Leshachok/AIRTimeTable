import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pair } from '../request/request';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})

export class EditDialogComponent implements OnInit {

  public pair: Pair = new Pair('', '', '', [], 0, '', '')
  public room: string = ''
  public type: string = ''
  public subject: string = ''
  public types: string[] = ['lab', 'lecture', 'practice']
  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.pair = this.config.data.pair
    this.room = this.pair.room
    this.type = this.pair.type
    this.subject = this.pair.subject
  }

  close(){
    this.pair.room = this.room
    this.pair.subject = this.subject
    this.pair.type = this.type
    
    this.ref.close(this.pair)
  }

}

