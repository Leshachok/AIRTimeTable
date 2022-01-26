import { Component, OnInit, SimpleChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
//import { Day, Pair } from '../request/request';
import { TimeTableService } from 'src/services/timetableservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Day, Pair } from 'src/request/request';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  days: Day[] = []
  pairNumbers = [1, 2, 3, 4]
  divisionId = '61a388bc09b14de7d30ac552'
  days_enum: Array<string> = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"]

  deleteId: number = 0
  onDeleted = false

  edit_image:string ="assets/img/edit.png";
  delete_image:string ="assets/img/delete.png";
  live_image:string = "assets/img/live.svg"

  mapDomenIcon: Map<string, string> = new Map([
    ["meet.google.com", "assets/img/gmeet.svg"],
    ["zoom.us", "assets/img/zoom.svg"],
    ["teams.microsoft.com", "assets/img/teams.svg"],
  ])

  constructor(
       private service: TimeTableService,
       private messageService: MessageService,
       private dialogService: DialogService, 
       private confService: ConfirmationService) { }
  
  ngOnInit(){
    // this.divisionId = this.service.getEditGroup()
    this.days_enum.forEach((weekday, index)=>{
      this.days.push(new Day(weekday, []))
      this.days[index].weekday = weekday
    })
    this.getPairs()
  }

  drop(event: CdkDragDrop<(Pair | null)[]>) {
    this.messageService.add({severity:'success', summary: 'Змінено', detail: 'Ви посунули пару'});
    
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      event.container.data.forEach((element, index) => {
        if(index >  event.previousIndex) console.log("need to change time on "+ element!.subject)
      });
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      )
      // в тот день, когда украли пару, ничего не меняем
      // если есть свободное место, то пары не двигаем, если нет, то к последующим прибавляем время
      event.container.data.forEach((element, index) => {
        if(index >  event.currentIndex) {
          console.log("need to change time on current container "+ element!.subject)
        }
      });
    }
  }

  getPairs(){
    this.service.getPairs(this.divisionId, "current").subscribe(
      (response) => {
        let pairs = response.lessons
          pairs = pairs.sort((a, b) => a.day - b.day)
          

          pairs.forEach((pair) => {
            if(pair.start.length == 4) pair.start = '0' + pair.start
            if(pair.end.length == 4) pair.end = '0' + pair.end
            this.days[pair.day-1].pairs.push(pair)
            
            // if(pair.link.length){
            //   pair.link_icon = "assets/img/custom.jpg";
            //   [...this.mapDomenIcon.keys()].forEach((key) => {
            //     if(pair.link.includes(key)){
            //       pair.link_icon = this.mapDomenIcon.get(key)!!
            //     }
            //   })
            // }
          })

          this.days.forEach(day => {
            this.pairNumbers.forEach(number => {
              if(day.pairs.find(pair => pair?.number == number) == undefined){
                day.pairs.splice(number-1, 0, null)
              }
            })
          })

          

        // тут в pairs записываются пары
        // this.pairs = response.data
        // this.pairs.forEach( (day) => {
        //   day.pairs.forEach( (pair) => {

        //     if(pair.link.length){
        //       pair.link_icon = "assets/img/custom.jpg";
        //       [...this.mapDomenIcon.keys()].forEach((key) => {
        //         if(pair.link.includes(key)){
        //           pair.link_icon = this.mapDomenIcon.get(key)!!
        //         }
        //       })
        //     }

            

        //   })
        // })

      },
      (error) => {
        console.error('There was an error!', error)
        this.days = []
      }
    
    )
  }

  openLink(url: string){
    window.open(url)
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
            // this.service.editPair(this.group, pair).subscribe(
            //   (response) =>{
            //       this.getPairs()
            //       this.messageService.add({severity:'success', summary: 'Змінено', detail: 'Пара успішно змінена!'});
            //   },
            //   (error) => {

            //   }
            // )
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
  

}
