import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss']
})
export class TimetableComponent implements OnInit {

  json: string = ''

  constructor(private httpClient: HttpClient) { }

  ngOnInit(){
    //this.getData()
  }

  async getData(): Promise<void> {
    const params = new HttpParams()
    .set('division', 'УІ191')
    .set('day', 'monday');

    let url: string = `https://routine.pnit.od.ua/routine/getLessons`;
    const response = this.httpClient.post(url, {params}, {headers: {'Access-Control-Allow-Origin': 'true'}})

    response.subscribe(
      (val) => {
        this.json = val as string
      },
      (response) => {
          alert(response.message)
          console.error('There was an error!', response)
      }
    )
  
  }

}