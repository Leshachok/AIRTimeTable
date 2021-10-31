import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { TelegramLoginService } from 'src/services/telegramloginservice';
import { TimeTableService } from 'src/services/timetableservice';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { Day,  Pair } from '../request/request';

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
  add_pair_dialog_visible = false

  room:string = '';
  subject:string = '';
  time:string ='';

  edit_image:string ="assets/img/edit.png";
  delete_image:string ="assets/img/delete.png";

  mapDomenIcon: Map<string, string> = new Map([
    ["meet.google.com", "assets/img/gmeet.svg"],
    ["zoom.us", "assets/img/zoom.svg"],
    ["teams.microsoft.com", "assets/img/teams.svg"],
  ])

  constructor(private service: TimeTableService, private TgService: TelegramLoginService,
       private confService: ConfirmationService, private messageService: MessageService, private dialogService: DialogService) { 
    this.tgID = TgService.getID()
  }

  ngOnInit() {
    this.getPairs()
    this.days.map((value)=> new Date(value))
  }


  showDialogEdit(pair: Pair){
    const ref = this.dialogService.open(EditDialogComponent, {
      data: {
        pair: pair
      },
      header: 'Редагування пари',
      width: '25rem'
      
    });

    ref.onClose.subscribe(
      (pair)=>{
          if(pair){
            this.service.editPair(this.editAllowGroup, pair).subscribe(
              (response) =>{
                  this.getPairs()
                  this.messageService.add({severity:'success', summary: 'Змінено', detail: 'Пара успішно змінена!'});
              },
              (error) => {

              }
            )
          }
      }
    )
  }

  showDialogCreate(){
    const ref = this.dialogService.open(AddDialogComponent, {
      header: 'Додання нової пари',
      width: '25rem',
    });
    ref.onClose.subscribe(
      (pairs)=>{
          if(pairs){
            this.service.addPair(JSON.stringify(pairs)).subscribe(
              (response) =>{
                  this.messageService.add({severity:'success', summary: 'Додано', detail: 'Пара успішно додана!'});
                  this.getPairs()
            
              },
              (error) => {

              }
            )
          }
      }
    )
  }


  ngOnChanges(changes: SimpleChanges){
      if (changes.group){ 
        this.getPairs()
        this.service.setLastSelectedGroup(changes.group.currentValue)
      }     
  }

  onDeletePair(id: number){
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
        this.pairs.forEach( (day) => {
          day.pairs.forEach( (pair) => {

            if(pair.link.length){
              pair.link_icon = "assets/img/custom.jpg";
              [...this.mapDomenIcon.keys()].forEach((key) => {
                if(pair.link.includes(key)){
                  pair.link_icon = this.mapDomenIcon.get(key)!!
                }
              })
            }

            

          })
        })

      },
      (error) => {
        console.error('There was an error!', error)
        this.pairs = []
      }
    
    )
  }

  openLink(url: string){
    window.open(url)
  }
  
}