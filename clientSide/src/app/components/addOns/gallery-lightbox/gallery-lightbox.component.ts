import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import {
  animate,
  AnimationEvent,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { UserService } from "src/app/services/user.service";
import { Router } from "@angular/router";
import Shuffle from "shufflejs";

export interface RecordData {
  id: any;
  imageTitle: string;
  categoryName: string;
  pathImage: String;
  shortDescription: string;
}

@Component({
  selector: "app-gallery-lightbox",
  templateUrl: "./gallery-lightbox.component.html",
  styleUrls: ["./gallery-lightbox.component.css"],
  animations: [
    // New animation for the badge of "More comming soon!"
    trigger(
      "enterAnimation",
      [
        transition(":enter", [
          style({ opacity: 0 }),
          animate("500ms", style({ opacity: 1 })),
        ]),
        transition(":leave", [
          style({ opacity: 1 }),
          animate("100ms", style({ opacity: 0 })),
        ]),
      ],
    ),
    trigger("animation", [
      transition("void => visible", [
        style({ transform: "scale(0.5)" }),
        animate("150ms", style({ transform: "scale(1)" })),
      ]),
      transition("visible => void", [
        style({ transform: "scale(1)" }),
        animate("150ms", style({ transform: "scale(0.5)" })),
      ]),
    ]),
    trigger("animation2", [
      transition(":leave", [
        style({ opacity: 1 }),
        animate("50ms", style({ opacity: 0.8 })),
      ]),
    ]),
  ],
})
export class GalleryLightboxComponent
  implements OnInit, AfterViewInit, AfterViewChecked {
  @Input()
  galleryData: RecordData[] = [];

  @Input()
  showCount: boolean = false;
  @Input()
  shownElements: number = 4;

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

  public categories: Array<any> = [];
  public selectedCategory: string = Shuffle.ALL_ITEMS;

  // All of these variables are used to generate the grid of images.
  @ViewChild("grid")
  grid: ElementRef;
  @ViewChildren("images")
  images: QueryList<any>;

  public gridShuffle?: Shuffle;

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    if (this.screenWidth < 700) {
      this.pageSize = 3;
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.gridShuffle = new Shuffle(this.grid.nativeElement, {
      itemSelector: ".grid-item",
      isCentered: true,
    });

    // If the list of images rendered in the ngFor changes, execute the following
    // code. This is made so the layout is rendered sort of correctly.
    this.images.changes.subscribe((value) => {
      this.gridShuffle.resetItems();

      // Simulate a call to an API
      setTimeout(() => {
        this.gridShuffle.layout();
      }, 2000);
    });

    // This is a hacky way of doing this, as the content has not been
    // loaded yet, as it comes from the parent as an input. This should
    // be changed, as the images are only used inside here, so Shuffle
    // has to be updated by hand at an unknown time. I decided for one
    // second, but it could need more for slower connections.
    setTimeout(() => {
      this.gridShuffle.layout();
    }, 2000);
  }

  // If the shuffle layout couldn't load in time, rerender when the user moves
  // the screen. Not ideal, but needed.
  ngAfterViewChecked(): void {
    this.gridShuffle?.layout();
  }

  getCategories() {
    let i = 0;
    this.userService.fetchCategories().subscribe(
      (response: any) => {
        for (let clave in response.data) {
          let val = response.data[clave];
          if (val.status == "2") {
            i += 1;
            this.categories[i] = response.data[clave];
          }
        }
        this.categories = this.categories.filter((n) => n);
      },
      (error) => {
        this.router.navigate(["/something-went-wrong"]);
      },
    );
  }

  filter(categoryType: string = Shuffle.ALL_ITEMS) {
    this.selectedCategory = categoryType;

    if (categoryType == Shuffle.ALL_ITEMS) {
      this.gridShuffle.filter(categoryType);
    } else {
      this.gridShuffle.filter((element: HTMLElement) => {
        const imageType = element.getElementsByTagName("span")[0].innerText;
        return imageType == categoryType;
      });
    }
  }

  onPreviewImage(index: number): void {
    this.showMask = true;
    this.previewImage = true;
    this.currentIndex = index;
    this.currentLightboxImage = this.galleryData[index];
    // console.log(this.currentLightboxImage.shortDescription);
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === "void") {
      this.showMask = false;
    }
  }

  onClosePreview() {
    this.previewImage = false;
  }

  next(): void {
    this.currentIndex = this.currentIndex + 1;
    if (this.currentIndex > this.galleryData.length - 1) {
      this.currentIndex = 0;
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }

  prev(): void {
    this.currentIndex = this.currentIndex - 1;
    if (this.currentIndex < 0) {
      this.currentIndex = this.galleryData.length - 1;
    }
    this.currentLightboxImage = this.galleryData[this.currentIndex];
  }

  pageChange() {
    this.gridShuffle.update();
  }
}
