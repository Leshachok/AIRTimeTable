import { CookieService } from "ngx-cookie-service"
import { TelegramLoginService } from "./telegramloginservice"

describe('TelegramLoginService', ()=>{
    let service: TelegramLoginService
    let cookieService: CookieService
    let name = 'Alex'
    let key = 'username'

    beforeEach(()=> {
        cookieService = jasmine.createSpyObj(['set'])
        service = new TelegramLoginService(cookieService);
    })

    it('should create instance', ()=>{
        //Given
        //When
        //Then
        expect(service).toBeTruthy();
    })

    it('should call method', ()=>{
        //Given
        //When
        service.saveData(name)
        //Then
        expect(cookieService.set).toHaveBeenCalledWith(key, name)
    })
})