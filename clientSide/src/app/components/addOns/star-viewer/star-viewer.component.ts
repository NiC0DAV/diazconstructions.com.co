import { Component, Input } from '@angular/core';

@Component({
  selector: 'star-viewer',
  templateUrl: './star-viewer.component.html',
  styleUrls: ['./star-viewer.component.css']
})
export class StarViewerComponent {
  @Input() ratingVal: any;
  public ratingV: number;
  public num: any;


  numSequence(n: number): Array<number> {
    // this.num = Array(n + 1);
    // console.log(Array(n + 1));
    return Array(n + 1);
  }
  // starHandler(value: any) {
  //   this.ratingV = value;
  // }
}
