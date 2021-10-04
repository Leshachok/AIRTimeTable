import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TelegramLoginService {

    key: string = 'username';

    init(){
        
    }

    getData(): string{
        return localStorage.getItem(this.key) as string;
    }

    saveData(userData: any){
        localStorage.setItem(this.key, userData[this.key]);
    }
    
}