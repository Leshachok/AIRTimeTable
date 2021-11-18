import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
//import { Day, Pair } from '../request/request';
import { TimeTableService } from 'src/services/timetableservice';
import { MessageService } from 'primeng/api';
import { Day, Pair } from 'src/request/request';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {


  
  pairs: Day[] = []
  group = 'УІ191'
  days: Array<string> = ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця"]

  mapDomenIcon: Map<string, string> = new Map([
    ["meet.google.com", "assets/img/gmeet.svg"],
    ["zoom.us", "assets/img/zoom.svg"],
    ["teams.microsoft.com", "assets/img/teams.svg"],
  ])

  constructor(private service: TimeTableService,  private messageService: MessageService) { }
  
  ngOnInit(): void {
    this.getPairs()
  }

  drop(event: CdkDragDrop<Pair[]>) {
    this.messageService.add({severity:'success', summary: 'Змінено', detail: 'Ви посунули пару'});
    

  

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      event.container.data.forEach((element, index) => {
        if(index >  event.previousIndex) console.log("need to change time on "+ element.subject)
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
          console.log("need to change time on current container "+ element.subject)
        }
      });
    }
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
