import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public token: any = '';

  constructor(
    private _userService: UserService,
  ) {
    this.token = this._userService.getToken();
  }

}
