import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent implements OnInit {

  public room: string = ''
  constructor(public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.room = this.config.data.room
  }

}
