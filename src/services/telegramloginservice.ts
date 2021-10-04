import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class TelegramLoginService {

    key: string = 'username';

    constructor(private cookieService: CookieService){
        
    }

    getData(): string{
        return this.cookieService.get(this.key)
    }

    saveData(userData: any){
        this.cookieService.set(this.key, userData[this.key]);
    }
    
}