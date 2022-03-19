import { Component, OnInit, SimpleChanges } from '@angular/core';
import {CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
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
  divisionId = ''
  days_enum: Array<string> = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"]

  isDragStarted = false

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

  mapPairNumberTime: Map<number, string> = new Map([
    [1, "08:00 - 09:35"],
    [2, "09:50 - 11:25"],
    [3, "11:40 - 13:15"],
    [4, "13:30 - 15:05"],
    [5, "15:20 - 16:55"],
  ])

  constructor(
       private timetableService: TimeTableService,
       private messageService: MessageService,
       private dialogService: DialogService, 
       private confService: ConfirmationService) { 
    this.divisionId = this.timetableService.getEditGroup()
  }
  
  ngOnInit(){
    this.days_enum.forEach((weekday, index)=>{
      this.days.push(new Day(weekday, []))
      this.days[index].weekday = weekday
    })
    this.getPairs()
  }

  dragStart(pair: (Pair | null)){
    this.isDragStarted = true
  }

  dragEnd(){
    this.isDragStarted = false
  }

  // это надо разбить на подфункции
  drop(event: CdkDragDrop<(Pair | null)[]>) {

    console.log("ташим")
  
    // если двигаю пару в пределах дня 
    if (event.previousContainer === event.container) {
      var previousIndex = event.previousIndex;
      var currentIndex = event.currentIndex;

      var draggedPair = event.previousContainer.data[previousIndex]
      var movedPair = event.container.data[currentIndex]

      var previousDay = draggedPair?.day

      moveItemInArray(event.container.data, previousIndex, currentIndex);


      var pairs = event.container.data
      var i

      // пару поставили в пустое место
      if(movedPair == null){
        // обновим номер пары
        var previousDayPairs = this.days[previousDay! -1].pairs
        previousDayPairs[currentIndex]!.number = currentIndex + 1

        this.editPairTime(draggedPair!.id, draggedPair!.day, currentIndex + 1)
        
        // обновим пустые ячейки
        this.fullPlaceholders(previousDay! -1)
        return
      }
    
      //пару подняли выше
      if(currentIndex < previousIndex){
        // новая позиция пары, меняем ее номер
        pairs[currentIndex]!.number = (currentIndex + 1)
        
        this.editPairTime(draggedPair!.id, draggedPair!.day, currentIndex + 1)

        // подняли пару выше, надо поменять время у всех, начиная с current index до previous index
        for(i = currentIndex + 1; i <= previousIndex; i++){
          var pair = pairs[i]
          if(pair == null) continue
          this.editPairTime(pair!.id, pair!.day, pair.number + 1)
          pair.number = pair.number + 1
        }

      } else if (currentIndex > previousIndex){
        // опустили пару ниже, надо поменять время у всех, начиная с previous index до current index
        for(i = previousIndex; i < currentIndex; i++){
          var pair = pairs[i]
          if(pair == null) continue
          this.editPairTime(pair!.id, pair!.day, pair.number - 1)
          pair.number = pair.number - 1
        }

        // новая позиция пары, меняем ее номер
        pairs[currentIndex]!.number = (currentIndex + 1)

        this.editPairTime(draggedPair!.id, draggedPair!.day, currentIndex + 1)
      }
      
    // пару передвинули в другой день
    } else {

      // проверим, не превышен ли лимит пар в день
      var pairsCount = event.container.data.filter((pair) => pair != null).length
      if(pairsCount > 4){
        this.messageService.add({severity: 'warn', summary: 'Забагато пар в день', detail: 'Пошкодуйте студентів'});
        return
      }
     

      var previousIndex = event.previousIndex;
      var currentIndex = event.currentIndex;

      var draggedPair = event.previousContainer.data[previousIndex]
      var movedPair = event.container.data[currentIndex]

  
      var previousDay = draggedPair?.day


      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      )
      
      var currentDay = +(event.container.id.split("-").pop()!) +1

      // пару поставили в пустое место
      if(movedPair == null){
        
        // обновим позицию пары
        var currentDayPairs = this.days[currentDay! - 1].pairs
        currentDayPairs[currentIndex]!.number = currentIndex + 1
        currentDayPairs[currentIndex]!.day = currentDay

        this.editPairTime(draggedPair!.id, currentDay, currentIndex + 1)

        // обновим пустые ячейки в том месте, куда перетащили пару
        this.fullPlaceholders(currentDay! -1)
        
        // обновим пустые ячейки в том месте, откуда украли пару
        this.fullPlaceholders(previousDay! -1)
        return

        
        // пару поставили на место другой пары
      } else {

        // обновили пустые ячейки в том месте, откуда украли пару
        this.fullPlaceholders(previousDay! -1)

        // обновляем номер пары
        var currentDayPairs = this.days[currentDay! - 1].pairs
        currentDayPairs[currentIndex]!.number = currentIndex + 1
        currentDayPairs[currentIndex]!.day = currentDay

        this.editPairTime(draggedPair!.id, currentDay, currentIndex + 1)

        // двигаем все нижние пары
        var i
        for(i = currentIndex + 1; i < 6; i++){
          if(currentDayPairs[i] != null){
            var pair = currentDayPairs[i]
            pair!.number = i + 1
            this.editPairTime(draggedPair!.id, pair!.day, i + 1)
          }
        }
      }
      
    }
    this.messageService.add({severity:'success', summary: 'Змінено', detail: 'Ви посунули пару'});
  }

  fullPlaceholders(dayIndex: number){
    var pairs = this.days[dayIndex].pairs.filter((pair) => pair != null)
    this.pairNumbers.forEach(number => {
      if(pairs.find(pair => pair?.number == number) == undefined){
        pairs.splice(number-1, 0, null)
      }
    })
    this.days[dayIndex].pairs = pairs
  }

  editPairTime(id: string, day: number, num: number){
    this.timetableService.editPairTime(id, day, num).subscribe(
      (response) => {
        console.log(response)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  getPairs(){
    this.timetableService.getPairs(this.divisionId, "current").subscribe(
      (response) => {
        let pairs = response.lessons
          pairs = pairs.sort((a, b) => a.day - b.day)
          

          pairs.forEach((pair) => {
            if(pair.start.length == 4) pair.start = '0' + pair.start
            if(pair.end.length == 4) pair.end = '0' + pair.end
            this.days[pair.day-1].pairs.push(pair)
            
            if(pair.link){
              pair.icon = "assets/img/custom.jpg";
              [...this.mapDomenIcon.keys()].forEach((key) => {
                if(pair.link.includes(key)){
                  pair.icon = this.mapDomenIcon.get(key)!!
                }
              })
            }
          })

          this.days.forEach((day) => {
            day.pairs.sort((a, b) => a!.number - b!.number)
          })

          this.days.forEach(day => {
            this.pairNumbers.forEach(number => {
              if(day.pairs.find(pair => pair?.number == number) == undefined){
                day.pairs.splice(number-1, 0, null)
              }
            })
          })

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
            this.timetableService.editPair(pair).subscribe(
              (response) =>{
                this.days.forEach((day) => day.pairs = [])
                this.getPairs()
                this.messageService.add({severity:'success', summary: 'Змінено', detail: 'Пара успішно змінена!'});
              },
              (error) => {
                this.messageService.add({severity:'error', summary: 'Не змінено', detail: pair.id});
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
            this.timetableService.addPair(JSON.stringify(pairs)).subscribe(
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
        this.timetableService.setLastSelectedGroup(changes.group.currentValue)
      }     
  }

  onDeletePair(id: string){
    //this.deleteId = pair.id
    this.onDeleted = true
    this.confService.confirm({
      message: 'Ви дійсно хочете видалити пару?',
        accept: () => {
            //Actual logic to perform a confirmation
            // this.service.deletePair(id).subscribe(
            //   (response) => {
            //       this.messageService.add({severity:'success', summary: 'Видалено', detail: 'Пара успішно видалена'});
            //       this.getPairs()
            //   },
            //   (error) => {
            //       this.messageService.add({severity:'error', summary: 'Помилка', detail: 'Пара не видалена'});
            //   });
        },
        reject: () => {

        },
        acceptLabel: "Так",
        rejectLabel: "Ні"

    });
  }
  

}
