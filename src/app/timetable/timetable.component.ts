import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
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
  displayEdit = false
  displayDelete = false
  displayAdd = false
  deleteId: number = 0
  @Input() editAllowGroup: string = ''
  onDeleted = false
  
  room:string = '';
  subject:string = '';
  time:string ='';

  constructor(private service: TimeTableService, private TgService: TelegramLoginService,
       private confService: ConfirmationService, private messageService: MessageService) { 
    this.tgID = TgService.getID()
  }

  ngOnInit() {
    this.tgID = this.TgService.getID()
    this.editAllowGroup = this.service.getEditGroup()
    console.log(this.editAllowGroup + ' allowed')
  }


  showDialogEdit(room:string, subject:string, time:string){
    this.displayEdit = true
    this.room = room;
    this.subject = subject;
    this.time = time;
  }

  showDialogCreate(){
    this.displayAdd = true
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
      
  }


  onEditPair(){
    this.messageService.add({severity:'success', summary: 'Змінено', detail: 'Пара успішно змінена'});
    this.displayEdit = false;
  }
  onCreatePair(){
    this.messageService.add({severity:'success', summary: 'Створено', detail: 'Пара успішно створена'});
    this.displayAdd = false; 
  }

  onDeletePair(id: number){
    console.log('dsd');
    this.deleteId = id
    this.onDeleted = true
    this.confService.confirm({
      message: 'Ви дійсно хочете видалити пару?',
        accept: () => {
            //Actual logic to perform a confirmation
            this.service.deletePair(id);
            this.messageService.add({severity:'success', summary: 'Видалено', detail: 'Пара успішно видалена'});
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