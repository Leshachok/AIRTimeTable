import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable} from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { Division, EditGroupResponse, Pair, WeekTimetableResponse } from "src/request/request";
import { TelegramLoginService } from "./telegramloginservice";

const origin = 'https://timetable.univera.app'
// const origin = 'https://timetable.diialovesyou.com'

@Injectable({
    providedIn: 'root'
})
export class TimeTableService {

    public EDIT_KEY = "EDIT_DIVISION_ID"
    public editDivisionId = ''
    private lastSelectedGroup = ''
    private lastSelectedGroupId = ''
    private keyGroup = 'lastSelect'
    private keyId = 'lastSelectId'

    constructor(private httpClient: HttpClient, private service: TelegramLoginService, private cookieService: CookieService) {
        this.editDivisionId = cookieService.get(this.EDIT_KEY)
     }

    getLastSelectedGroup(): string{
        this.lastSelectedGroup = this.cookieService.get(this.keyGroup)
        return this.lastSelectedGroup? this.lastSelectedGroup: 'УК211'
    }

    setLastSelectedGroup(group: string){
        this.cookieService.set(this.keyGroup, group, 7)
    }

    getLastSelectedGroupId(): string{
        this.lastSelectedGroupId = this.cookieService.get(this.keyId)
        return this.lastSelectedGroupId? this.lastSelectedGroupId: '61a388bc09b14de7d30ac552'
    }

    setLastSelectedGroupId(id: string){
        this.cookieService.set(this.keyId, id, 7)
    }

    getEditGroup():string{
        return this.editDivisionId
    }

    getEditGroupByTgID(): Observable<EditGroupResponse>{
        const params = new HttpParams()
            .set('editorID', this.service.getID())
        const url: string = origin + '/routine/getEditGroup';
        return this.httpClient.post<EditGroupResponse>(url, params)
    }

    setEditGroup(division: string){
        this.editDivisionId = division
        this.cookieService.set(this.EDIT_KEY, division, 7)
    }

    getDivisions(){
        const url: string = origin + '/divisions';
        return this.httpClient.get<Division[]>(url)
    }

    getPairs(divisionId: string, week: string): Observable<WeekTimetableResponse>{
        const url: string = `${origin}/lessons/${divisionId}/${week}`;
        return this.httpClient.get<WeekTimetableResponse>(url)
    }

    addGroupEditor(division: string = 'set group here'){
        const params = new HttpParams()
            .set('division', division)
            .set('editorID', this.service.getID())
            .set('username', this.service.getUsername())
            .set('name', this.service.getFirstName())
        const url: string = origin + '/routine/insertEG';
        this.httpClient.post(url, params).subscribe(
            (response) => {

            },
            (error) => {
               console.error('There was an error!', error)
        })

    }

    editPairTime(id: string, day: number, num: number): Observable<any>{
        const body = {
            "data": {
                "day": day,
                "number": num,
            }
        }

        const headers = {
            "authorization": "Bearer " + this.service.getAccessToken()
        }
        const url: string = `${origin}/app/lesson/${id}`;
        return this.httpClient.post(url, body, { headers: headers })
    }

    editPair(pair: Pair): Observable<any>{
        const body = {
            "data": {
                "link": pair.link,
                "room": pair.room,
                "type": pair.type
            }
        }

        const headers = {
            "authorization": "Bearer " + this.service.getAccessToken()
        }
        const url: string = `${origin}/lesson/${pair.id}`;
        return this.httpClient.post(url, body, {headers: headers})
    }

    deletePair(id: number): Observable<Response>{
        const params = new HttpParams()
            .set('pairID', id)
            .set('editorID', this.service.getID())
        const url: string = `${origin}/routine/deletePair`;
        return this.httpClient.post<Response>(url, params)

    }

    addPair(json: string){
        const params = new HttpParams()
            .set('json', json)
        const url: string = `${origin}/routine/insertLessons`;
        return this.httpClient.post<any>(url, params)
    }

}

