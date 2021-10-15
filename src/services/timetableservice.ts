import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PairResponse } from "src/app/request/request";
import { TelegramLoginService } from "./telegramloginservice";

@Injectable({
    providedIn: 'root'
})
export class TimeTableService {

    private map: Map<number, string[]> = new Map([
        [1, ["УК211", "УП211"]],
        [2, ["УК201", "УП201", "УП-202"]],
        [3, ["УІ191", "УК191"]],
        [4, ["УІ181", "УІ184"]],
    ])

    constructor(private httpClient: HttpClient, private service: TelegramLoginService) { }
    

    getGroupsByCourse(course: number): string[]{
        let groups = this.map.get(course) 
        return groups ? groups : []
    }

    getPairs(group: string): Observable<PairResponse>{
        const params = new HttpParams()
            .set('division', group)
        const url: string = `https://routine.pnit.od.ua/routine/getLessons`;
        return this.httpClient.post<PairResponse>(url, params)
    }

    addGroupEditor(division: string = 'УІ191'){
        const params = new HttpParams()
            .set('division', division)
            .set('editorID', this.service.getID())
            .set('username', this.service.getUsername())
        
        const url: string = `https://routine.pnit.od.ua/routine/insertEG`;
        this.httpClient.post(url, params).subscribe(
            (response) => {
            console.log(response.toString());
            

            },
            (error) => {
               console.error('There was an error!', error)
            })

    }

    editPair(){

    }

    deletePair(){

    }

    addPair(){

    }
    
}

