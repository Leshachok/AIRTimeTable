import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AIRTimeTable';

  onTelegramAuth(user:Map<String, String>){
    alert(user.get('first_name'));
  }

}
