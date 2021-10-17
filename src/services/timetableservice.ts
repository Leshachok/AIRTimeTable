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
        [2, ["УК201", "УП201", "УП202"]],
        [3, ["УІ191", "УК191"]],
        [4, ["УІ181", "УІ184"]],
    ])
    private editGroup: string = ''

    constructor(private httpClient: HttpClient, private service: TelegramLoginService) { }

    getEditGroup(): string{
        return this.editGroup
    }

    setEditGroup(group: string){
        this.editGroup = group
    }

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

    addGroupEditor(division: string = 'set group here'){
        const params = new HttpParams()
            .set('division', division)
            .set('editorID', this.service.getID())
            .set('username', this.service.getUsername())
            .set('name', this.service.getFirstName())
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

    deletePair(id: number){
        const params = new HttpParams()
        .set('pairID', id)
        .set('editorID', 2)
        const url: string = `https://routine.pnit.od.ua/routine/deletePair`;
        this.httpClient.post(url, params).subscribe(
            (response) => {
                console.log(response.toString());
            },
            (error) => {
                console.error('There was an error!', error)
            })

    }

    addPair(){

    }
    
}

