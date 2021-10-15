import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { TimeTableService } from 'src/services/timetableservice';
import { Day } from '../request/request';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit, OnChanges {

  //тут номер группы хранится
  @Input() group: string = ""
  @Input() tgID: number = 0

  //тут както пары хранятся
  pairs: Day[] = []
  days: string[] = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"]
  display = false
  deleteId: number = 0
  onDeleted = false

  constructor(private service: TimeTableService, private TgService: TelegramLoginService, private confService: ConfirmationService) { 
    this.tgID = TgService.getID()
  }

  ngOnInit() {
  }

  room:string = '';
  subject:string = '';
  showDialog(room:string,subject:string){
    this.display = true
    this.room = room;
    this.subject = subject;
  }


  ngOnChanges(changes: SimpleChanges){
      this.service.getPairs(this.group).subscribe(
        (response) => {
          
          // тут в pairs записываются пары
          this.pairs = response.data
        },
        (error) => {
            console.error('There was an error!', error)
            this.pairs = []
        }
      ) 
      this.tgID = this.TgService.getID()
  }

  onEditPair(){
    alert('Вы точно хотите изменить пару?')
  }

  onDeletePair(id: number){
    this.deleteId = id
    this.onDeleted = true
    this.confService.confirm({
      message: 'Ви дійсно хочете видалити пару?',
        accept: () => {
            //Actual logic to perform a confirmation
            
        },
        reject: () => {

        },
        acceptLabel: "Так",
        rejectLabel: "Ні"

    });
  }

  edit_image:string ="assets/img/edit.png";
  delete_image:string ="assets/img/delete.png"
  
}