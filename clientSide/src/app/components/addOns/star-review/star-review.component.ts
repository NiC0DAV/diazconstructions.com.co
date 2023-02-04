import { Component, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'star-review',
  templateUrl: './star-review.component.html',
  styleUrls: ['./star-review.component.css']
})
export class StarReviewComponent {

  @Output() messageEvent = new EventEmitter<String>();

  public rating: String = '';

  starHandler(value: any) {
    this.rating = value;
    if (this.rating != '') {
      this.sendData();
    }
  }

  sendData() {
    this.messageEvent.emit(this.rating);
  }


}
