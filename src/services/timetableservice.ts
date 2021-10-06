import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subscription } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TimeTableService {

    constructor(private httpClient: HttpClient){ 

    }

    async getPairs(group: string){
        let pairs: any[] = []
        const params = new HttpParams()
            .set('division', group)
            .set('day', 'monday');
    
        const url: string = `https://routine.pnit.od.ua/routine/getLessons`;
        const response = await this.httpClient.post(url, {params}, {headers: {'Access-Control-Allow-Origin': 'true'}})
    
        response.subscribe(
          (val) => {
            let json = val as string
            // json decode
            // тут в pairs записываются пары
            return pairs
          },
          (response) => {
              console.error('There was an error!', response)
              return pairs
          }
        )
    }

    editPair(){

    }

    deletePair(){

    }

    addPair(){

    }
    
}