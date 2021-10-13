import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PairResponse } from "src/app/request/request";

@Injectable({
    providedIn: 'root'
})
export class TimeTableService {

    private map: Map<number, string[]> = new Map([
        [1, ["УК-211", "УП-211"]],
        [2, ["УК-201", "УП-201", "УП-202"]],
        [3, ["УІ-191", "УК-191"]],
        [4, ["УІ-181", "УІ-184"]],
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
    
        const url: string = `https://stats.pnit.od.ua/routine/getLessons`;
        return this.httpClient.post<PairResponse>(url, {params})
    
    }

    editPair(){

    }

    deletePair(){

    }

    addPair(){

    }
    
}

