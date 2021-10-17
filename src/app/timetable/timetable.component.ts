import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { TimeTableService } from 'src/services/timetableservice';
import { AppComponent } from '../app.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { Day } from '../request/request';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
})
export class TimetableComponent implements OnInit, OnChanges {

  //тут номер группы хранится
  @Input() group: string = "УК211"
  @Input() tgID: number = 0

  //тут както пары хранятся
  pairs: Day[] = []
  days: Array<string> = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"]
  displayEdit = false
  displayDelete = false
  displayAdd = false
  deleteId: number = 0
  @Input() editAllowGroup: string = ''
  onDeleted = false
  
  room:string = '';
  subject:string = '';
  time:string ='';

  edit_image:string ="assets/img/edit.png";
  delete_image:string ="assets/img/delete.png"

  constructor(private service: TimeTableService, private TgService: TelegramLoginService,
       private confService: ConfirmationService, private messageService: MessageService, private dialogService: DialogService) { 
    this.tgID = TgService.getID()
  }

  ngOnInit() {
    this.days.map((value)=> new Date(value))
  }


  showDialogEdit(room:string, subject:string, time:string){
    this.room = room
    const ref = this.dialogService.open(EditDialogComponent, {
      data: {
        room: '404f'
      },
      header: 'Choose a Car',
      width: '70%',
      
    });
    // this.displayEdit = true
    // this.room = room;
    // this.subject = subject;
    // this.time = time;

  }

  showDialogCreate(){
    console.log('opned')
  }


  ngOnChanges(changes: SimpleChanges){
      if(changes.editAllowGroup){
        console.log(changes.editAllowGroup.currentValue + ' ngonch')
      }else if (changes.group){
         this.getPairs()
      }     
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
            this.service.deletePair(id).subscribe(
              (response) => {
                  this.messageService.add({severity:'success', summary: 'Видалено', detail: 'Пара успішно видалена'});
                  this.getPairs()
              },
              (error) => {
                  this.messageService.add({severity:'error', summary: 'Помилка', detail: 'Пара не видалена'});
              });
        },
        reject: () => {

        },
        acceptLabel: "Так",
        rejectLabel: "Ні"

    });
  }

  getPairs(){
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
  
}