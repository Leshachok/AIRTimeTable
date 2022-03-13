import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { CookieService } from "ngx-cookie-service";
import { Observable } from "rxjs";
import { LoginResponse } from "src/request/request";

@Injectable({
    providedIn: 'root'
})
export class TelegramLoginService {

    keyName: string = 'username'
    keyID: string = 'id'
    private tgID: number = 0
    private username: string = ""
    private first_name: string = ""
    private access_token: string = ""

    constructor(private cookieService: CookieService, private httpClient: HttpClient) { }

    
    getID():number{
        this.tgID = +this.cookieService.get(this.keyID)
        return this.tgID
    }

    getFirstName(): string{
        return this.first_name
    }

    getUsername(): string{
        this.username = this.cookieService.get(this.keyName)
        return this.username
    }

    saveAccessToken(token: string){
        this.access_token = token
    }

    saveData(userData: any){
        this.tgID = userData[this.keyID]
        this.username = userData[this.keyName]
        this.first_name = userData['first_name'] ? userData['first_name'] : userData['second_name']
        this.cookieService.set(this.keyName, this.username);
        this.cookieService.set(this.keyID, this.tgID.toString());
    }

    login(data: any): Observable<LoginResponse>{
        const body = {
            "tgLogin": data
        }
        const url: string = `https://api.timetable.univera.app/login`;
        return this.httpClient.post<LoginResponse>(url, body)
    }
    
}
