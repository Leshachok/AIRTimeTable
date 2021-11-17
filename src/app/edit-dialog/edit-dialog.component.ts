import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Pair } from '../../request/request';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})

export class EditDialogComponent implements OnInit {

  public pair: Pair = new Pair('', '', '', [], 0, '', '', 0)
  public room: string = ''
  public typeUa: string = 'Лекція'
  public type: string = ''
  public subject: string = ''
  public types: string[] = []
  public link: string = ''
  private typesMap: Map<string, string> = new Map([
    ["Лабораторна", 'lab'],
    ["Лекція", 'lecture'],
    ["Практика", 'practice'],
  ]) 

  constructor(private config: DynamicDialogConfig, private ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.pair = this.config.data.pair
    this.room = this.pair.room? this.pair.room: '100'
    this.type = this.pair.type? this.pair.type: ''
    this.subject = this.pair.subject? this.pair.subject: 'Назва предмету'
    this.types = [...this.typesMap.keys()]
    this.link = this.pair.link
    if(this.type.length){
      this.types.forEach((key) => {
        if(this.type == this.typesMap.get(key)!!){
          this.typeUa = key
        }
      })
    }
  }

  close(){
    this.type = this.typesMap.get(this.typeUa)!!
    this.pair.room = this.room
    this.pair.subject = this.subject
    this.pair.type = this.type
    this.pair.link = this.link
    
    this.ref.close(this.pair)
  }

}

