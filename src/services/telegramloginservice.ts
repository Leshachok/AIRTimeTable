import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TelegramLoginService {

    init(){
        window['loginViaTelegram'] = loginData => this.loginViaTelegram(loginData);
    }

    private loginViaTelegram(loginData: any){
        
    }
    
}