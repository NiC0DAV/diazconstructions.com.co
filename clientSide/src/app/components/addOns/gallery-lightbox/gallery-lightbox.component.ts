import { Component, Input, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger, AnimationEvent } from '@angular/animations';

export interface RecordData {
  id: any;
  imageTitle: string;
  categoryName: string;
  pathImage: String;
  shortDescription: string;
};

@Component({
  selector: 'app-gallery-lightbox',
  templateUrl: './gallery-lightbox.component.html',
  styleUrls: ['./gallery-lightbox.component.css'],
  animations: [
    trigger('animation', [
      transition('void => visible', [
        style({transform: 'scale(0.5)'}),
        animate('150ms', style({transform: 'scale(1)'}))
      ]),
      transition('visible => void', [
        style({transform: 'scale(1)'}),
        animate('150ms', style({transform: 'scale(0.5)'}))
      ]),
    ]),
    trigger('animation2', [
      transition(':leave', [
        style({opacity: 1}),
        animate('50ms', style({opacity: 0.8}))
      ])
    ])
  ]
})
export class GalleryLightboxComponent {
  @Input() galleryData: RecordData[] = [];
  @Input() showCount: boolean = false;
  @Input() shownElements: number = 4;

  public previewImage: boolean = false;
  public showMask: boolean = false;
  public currentLightboxImage: RecordData = this.galleryData[0];
  public currentIndex: number = 0;
  public controls: boolean = true;
  public totalImageCount: number = 0;
  public screenWidth: any;
  public screenHeight: any;
  // public p: number = 1;
  public page = 1;
  public pageSize = 6;


  constructor() {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if(this.screenWidth < 700){
      this.pageSize = 3;
    }
    // console.log(this.screenWidth);
  }

  // ngAfterViewInit(): void{
  //   this.totalImageCount = this.galleryData.length;
  // }

  onPreviewImage(index: number): void{
    this.showMask = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index];
    // console.log(this.currentLightboxImage.shortDescription);
  }

  onAnimationEnd(event: AnimationEvent){
    if(event.toState === 'void'){
      this.showMask = false;
    }
  }

  onClosePreview(){
    this.previewImage = false;
  }

  next(): void {
    this.currentIndex = this.currentIndex + 1;
    if(this.currentIndex > this.galleryData.length - 1) {
      this.currentIndex = 0;
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }

  prev(): void {
    this.currentIndex = this.currentIndex - 1;
    if(this.currentIndex < 0) {
      this.currentIndex = this.galleryData.length - 1;
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }

}
