import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  public module: String = '';

  @Output() messageEvent = new EventEmitter<String>();

  ngDoCheck() {
    if (this.module != '') {
      this.sendData();
    }
  }
  sendData() {
    this.messageEvent.emit(this.module);
  }

}
