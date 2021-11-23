import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { Division, EditGroupResponse, Pair, Response } from "src/request/request";
import { TelegramLoginService } from "./telegramloginservice";

@Injectable({
    providedIn: 'root'
})
export class TimeTableService {

    public editGroup = ''
    private lastSelectedGroup = ''
    private lastSelectedGroupId = ''
    private keyGroup = 'lastSelect'
    private keyId = 'lastSelectId'

    constructor(private httpClient: HttpClient, private service: TelegramLoginService, private cookieService: CookieService) { }

    getLastSelectedGroup(): string{
        this.lastSelectedGroup = this.cookieService.get(this.keyGroup)
        return this.lastSelectedGroup? this.lastSelectedGroup: 'УК211'
    }

    setLastSelectedGroup(group: string){
        this.cookieService.set(this.keyGroup, group)
    }

    getLastSelectedGroupId(): string{
        this.lastSelectedGroupId = this.cookieService.get(this.keyId)
        return this.lastSelectedGroupId? this.lastSelectedGroupId: '619c4239aac3eafc5139d2c6'
    }

    setLastSelectedGroupId(id: string){
        this.cookieService.set(this.keyId, id)
    }

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


    getDivisions(){
        const url: string = `https://routine.pnit.od.ua/divisions`;
        return this.httpClient.get<Division[]>(url)
    }

    getPairs(divisionId: string): Observable<Pair[]>{
        const url: string = `https://routine.pnit.od.ua/lessons/${divisionId}/current`;
        console.log(url)
        return this.httpClient.get<Pair[]>(url)
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

    // editPair(division: string, pair: Pair): Observable<any>{
    //     const params = new HttpParams()
    //         .set('division', division)
    //         .set('editorID', this.service.getID())
    //         .set('room', pair.room)
    //         .set('type', pair.type)
    //         .set('pairID', pair.id)
    //         .set('subject', pair.subject)
    //         .set('link', pair.link)
    //     const url: string = `https://routine.pnit.od.ua/routine/editPair`;
    //     return this.httpClient.post(url, params)
    // }

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

