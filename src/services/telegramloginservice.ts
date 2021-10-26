import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class TelegramLoginService {

    keyName: string = 'username'
    keyID: string = 'id'
    private tgID: number = 0
    private username: string = ""
    private first_name: string = ""

    constructor(private cookieService: CookieService) { }

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

    saveData(userData: any){
        this.tgID = userData[this.keyID]
        this.username = userData[this.keyName]
        this.first_name = userData['first_name'] ? userData['first_name'] : userData['second_name']
        this.cookieService.set(this.keyName, this.username);
        this.cookieService.set(this.keyID, this.tgID.toString());
    }

    
}