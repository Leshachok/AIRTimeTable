import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PairResponse } from "src/app/request/request";

@Injectable({
    providedIn: 'root'
})
export class TimeTableService {

    private map: Map<number, string[]> = new Map([
        [1, ["first", "second"]],
        [2, ["third", "fourth"]],
        [3, ["fifth", "sixth"]],
        [4, ["seventh", "eighth"]],
    ])

    constructor(private httpClient: HttpClient){ 
        
    }

    getGroupsByCourse(course: number): string[]{
        let groups = this.map.get(course) 
        return groups ? groups : []
    }

    getPairs(group: string): Observable<PairResponse>{
        const params = new HttpParams()
            .set('division', group)
            .set('day', 'monday');
    
        const url: string = `https://routine.pnit.od.ua/routine/getLessons`;
        return this.httpClient.post<PairResponse>(url, {params}, {headers: {'Access-Control-Allow-Origin': 'true'}})
    
    }

    editPair(){

    }

    deletePair(){

    }

    addPair(){

    }
    
}

