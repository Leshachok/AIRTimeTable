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
  public types: string[] = []
  public link: string =''
  private typesMap: Map<string, string> = new Map([
    ["Лабораторна", 'lab'],
    ["Лекція", 'lecture'],
    ["Практика", 'practice'],
  ]) 

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.pair = this.config.data.pair
    this.room = this.pair.room
    this.types = [...this.typesMap.keys()]
    this.subject = this.pair.subject
    this.link = this.pair.link
  }

  close(){
    this.pair.room = this.room
    this.pair.subject = this.subject
    this.pair.type = this.type
    this.pair.link = this.link
    
    this.ref.close(this.pair)
  }

}

