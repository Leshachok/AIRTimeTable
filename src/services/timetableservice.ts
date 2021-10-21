import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { Observable } from "rxjs";
import { EditGroupResponse, Pair, PairResponse, Response } from "src/app/request/request";
import { TelegramLoginService } from "./telegramloginservice";

@Injectable({
    providedIn: 'root'
})
export class TimeTableService {

    public map: Map<number, string[]> = new Map([
        [1, ["УК211", "УП211", "УЕ211"]],
        [2, ["УЕ201", "УК201", "УП201", "УП202"]],
        [3, ["УІ191", "УК191", "УЕ191"]],
        [4, ["УІ184", "УК181", "УЕ181"]],
    ])
    public editGroup: string = ''

    constructor(private httpClient: HttpClient, private service: TelegramLoginService) { }

    getEditGroup():string{
        return this.editGroup
    }

    getEditGroupByTgID(): Observable<EditGroupResponse>{
        const params = new HttpParams()
            .set('editorID', this.service.getID())
        const url: string = `https://routine.pnit.od.ua/routine/getEditGroup`;
        return this.httpClient.post<EditGroupResponse>(url, params)
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

            },
            (error) => {
               console.error('There was an error!', error)
        })

    }

    editPair(division: string, pair: Pair): Observable<any>{
        const params = new HttpParams()
            .set('division', division)
            .set('editorID', this.service.getID())
            .set('room', pair.room)
            .set('type', pair.type)
            .set('pairID', pair.id)
            .set('subject', pair.subject)
        const url: string = `https://routine.pnit.od.ua/routine/editPair`;
        return this.httpClient.post(url, params)
    }

    deletePair(id: number): Observable<Response>{
        const params = new HttpParams()
            .set('pairID', id)
            .set('editorID', this.service.getID())
            .set('group', this.editGroup)
        const url: string = `https://routine.pnit.od.ua/routine/deletePair`;
        return this.httpClient.post<Response>(url, params)

    }

    addPair(json: string){
        const params = new HttpParams()
            .set('json', json)
        const url: string = `https://routine.pnit.od.ua/routine/insertLessons`;
        return this.httpClient.post<any>(url, params)
    }
    
}

