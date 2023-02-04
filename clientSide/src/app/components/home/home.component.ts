import { Component, ViewChild, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { UserService } from 'src/app/services/user.service';
import lgZoom from 'lightgallery/plugins/zoom';
import { LightGallery } from 'lightgallery/lightgallery';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { createPopper } from '@popperjs/core';

import Swal from 'sweetalert2';

declare var $: any;
declare var jQuery: any;

export interface RecordData {
  id: any;
  imageTitle: string;
  categoryName: string;
  pathImage: string;
  shortDescription: string;
};

interface RecordStore {
  cached?: RecordData[];
  refined?: RecordData[];
  stamp?: any;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [style({ opacity: 0 }), animate(600)]),
      transition(':leave', animate(600, style({ opacity: 0 })))
    ])
  ]
})
export class HomeComponent {
  private lightGallery!: LightGallery;
  public needRefresh = false;
  public webContent: any = {};
  public categories: Array<any> = [];
  public welcomeSection: any = {};
  public servicesSection: any = {};
  public characteristicsSection: any = {};
  public loader: boolean = true;
  public images: Array<any> = [];
  public imagesByCat: Array<any> = [];
  public imagesGal: Array<any> = [];
  public imagesGallery: Array<any> = [];
  public activeSlider: Array<any> = [];
  public activeGallery: Array<any> = [];
  public activeGalleryById: Array<any> = [];
  public reviewsList: Array<any> = [];
  public activeReviewsList: Array<any> = [];
  public loaderGallery: boolean = false;
  public Toast: any;
  public NOMBRE_HOST = location.port === "" || location.port == undefined ? "http://" + location.hostname + '/' : "http://" + location.hostname + ':' + location.port + '/';
  public store: RecordStore = {};
  public selection: String;
  public selectedCategory: any;
  public category: string;

  constructor(private _userService: UserService,private _router: Router, private renderer: Renderer2) {
    this.Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast: any) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

  }

  ngAfterViewChecked(): void {
    if (this.needRefresh) {
      this.lightGallery.refresh();
      this.needRefresh = false;
    }
  }

  settings = {
    counter: false,
    plugins: [lgZoom]
  };
  onInit = (detail:any): void => {
    this.lightGallery = detail.instance;
  };

  ngOnInit() {
    // this.selection = 'all';
    this.getWebContent();
    this.getCategories();
    this.getImages();
    this.getReviews();
    this.filter();

  }

  getWebContent() {
    this.loader = true;
    this._userService.fetchWebData().subscribe(
      (response: any) => {
        for (let clave in response.data) {
          let val = response.data[clave];
          if (val.status == '2') {
            this.webContent = response.data[clave];
          }
        }

        this.welcomeSection = this.webContent.welcomeSection;
        this.servicesSection = this.webContent.servicesSection;
        this.characteristicsSection = this.webContent.CharacteristicsSection;
        this.loader = false;
      }, (error: any) => {
        this._router.navigate(['/something-went-wrong']);
      }
    );
  }

  getCategories() {
    let i = 0;
    this._userService.fetchCategories().subscribe(
      (response: any) => {
        for (let clave in response.data) {
          let val = response.data[clave];
          if (val.status == '2') {
            i += 1;
            this.categories[i] = response.data[clave];
          }
        }
        this.categories = this.categories.filter(n => n);

      }, (error) => {
        this._router.navigate(['/something-went-wrong']);
      }
    );
  }

  getImages() {
    this._userService.getImages().subscribe(
      (response: any) => {
        this.images = response.data;
        for (let clave in this.images) {
          let val = this.images[clave];
          if (val.sliderStatus == '1') {
            this.activeSlider[clave] = this.images[clave];
          }
        }

        this.activeSlider = this.activeSlider.filter(n => n);
        this.loaderGallery = true;
        for (let clave in this.images) {
          let val = this.images[clave];
          if (val.imageStatus == '2') {
            this.activeGallery[clave] = this.images[clave];
          }
        }

        this.activeGallery = this.activeGallery.filter(n => n);
        let data = [];
        for (let newData of this.activeGallery){
          data.push(newData);
        }
        this.store.cached = data;
        this.store.refined = data.sort((a,b) => a.id - b.id);
        console.log(this.store.refined);
        this.loaderGallery = false;
      }
    );
  }

  filter(category: string = 'all'){
    this.store.refined = this.store.cached.filter(p => p.categoryName == category || category == 'all');
    this.selectedCategory = category;
  }
  imageByCategory(id: any) {
    this.loaderGallery = true;
    this.activeGalleryById = [];
    if (id === 'all') {
      this.getImages();
      // this.filter = 'all';

    } else {
      this._userService.getImagesByCategory(id).subscribe(
        (response: any) => {
          // this.filter = 'categoryId';
          this.imagesByCat = response.data;
          for (let clave in this.imagesByCat) {
            let val = this.imagesByCat[clave];
            if (val.imageStatus == '2') {
              this.activeGalleryById[clave] = this.imagesByCat[clave];
            }
          }

          this.activeGalleryById = this.activeGalleryById.filter(n => n);
          this.loaderGallery = false;
          this.needRefresh = true;
        }
      );
    }
  }

  prospectsForm(data: any){
    if(data.valid){
      this._userService.prospectRegister(data.value).subscribe(
        ( response: any ) => {
          this.Toast.fire({
            icon: 'success',
            title: response.message
          });
        }, ( error: any ) => {
          this.Toast.fire({
            icon: 'error',
            title: error.error.message
          });
        }
      );
    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'Ups! we are sorry, there was an error, please check the data you just entered, all fields are mandatory.'
      });
    }
  }

  getReviews(){
    this._userService.getReviews().subscribe(
      (response: any) => {
        this.reviewsList = [];
        this.reviewsList = response.data;
        for (let clave in this.reviewsList) {
          let val = this.reviewsList[clave];
          if (val.reviewStatus == '2') {
            this.activeReviewsList[clave] = this.reviewsList[clave];
          }
        }

        this.activeReviewsList = this.activeReviewsList.filter(n => n);

      },(error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }

  testimonialSlider: OwlOptions = {
    // controlsClass: 'owl-controls',
    autoplay: true,
    autoplaySpeed: 1200,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  ngAfterViewInit() {
    const popcorn = document.querySelector('#popcorn');
    const tooltip = document.querySelector('#tooltip');
    //@ts-ignore
    createPopper(popcorn, tooltip, {
      placement: 'top-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
    //Update Header Style and Scroll to Top
    function headerStyle() {
      if (jQuery('.main-header').length) {
        var windowpos = jQuery(window).scrollTop();
        if (windowpos >= 200) {
          jQuery('.main-header').addClass('fixed-header');
          jQuery('.scroll-to-top').fadeIn(300);
        } else {
          jQuery('.main-header').removeClass('fixed-header');
          jQuery('.scroll-to-top').fadeOut(300);
        }
      }
    }

    headerStyle();

    //Submenu Dropdown Toggle
    if (jQuery('.main-header li.dropdown ul').length) {
      jQuery('.main-header li.dropdown').append('<div class="dropdown-btn"></div>');

      //Dropdown Button
      jQuery('.main-header li.dropdown .dropdown-btn').on('click', () => {
        jQuery(this).prev('ul').slideToggle(500);
      });

      //Disable dropdown parent link
      jQuery('.navigation li.dropdown > a').on('click', function (e: { preventDefault: () => void; }) {
        e.preventDefault();
      });
    }


    //Hidden Bar Menu Config
    const hiddenBarMenuConfig = () => {
      var menuWrap = jQuery('.hidden-bar .side-menu');
      // appending expander button
      menuWrap.find('.dropdown').children('a').append(function () {
        return '<button type="button" class="btn expander"><i class="icon fa fa-angle-down"></i></button>';
      });
      // hidding submenu
      menuWrap.find('.dropdown').children('ul').hide();
      // toggling child ul
      menuWrap.find('.btn.expander').each(() => {
        jQuery(this).on('click', () => {
          jQuery(this).parent() // return parent of .btn.expander (a)
            .parent() // return parent of a (li)
            .children('ul').slideToggle();

          // adding class to expander container
          jQuery(this).parent().toggleClass('current');
          // toggling arrow of expander
          jQuery(this).find('i').toggleClass('fa-angle-up fa-angle-down');

          return false;

        });
      });
    }

    hiddenBarMenuConfig();


    // //Custom Scroll for Hidden Sidebar
    // if (jQuery('.hidden-bar-wrapper').length) {
    // 	jQuery('.hidden-bar-wrapper').mCustomScrollbar();
    // }


    //Hidden Bar Toggler
    if (jQuery('.hidden-bar-closer').length) {
      jQuery('.hidden-bar-closer').on('click', function () {
        jQuery('.hidden-bar').removeClass('visible-sidebar');
      });
    }
    if (jQuery('.hidden-bar-opener').length) {
      jQuery('.hidden-bar-opener').on('click', function () {
        jQuery('.hidden-bar').addClass('visible-sidebar');
      });
    }

    //Search Popup
    if (jQuery('#search-popup').length) {

      //Show Popup
      jQuery('.search-box-btn').on('click', function () {
        jQuery('#search-popup').addClass('popup-visible');
      });

      //Hide Popup
      jQuery('.close-search').on('click', function () {
        jQuery('#search-popup').removeClass('popup-visible');
      });
    }


    //Revolution Slider
    if (jQuery('.main-slider .tp-banner').length !== 0) {
      jQuery('.main-slider .tp-banner').show().revolution({
        dottedOverlay: 'yes',
        delay: 10000,
        startwidth: 1200,
        startheight: 730,
        hideThumbs: 600,

        thumbWidth: 80,
        thumbHeight: 50,
        thumbAmount: 5,

        navigationType: "bullet",
        navigationArrows: "0",
        navigationStyle: "preview3",

        touchenabled: "on",
        onHoverStop: "off",

        swipe_velocity: 0.7,
        swipe_min_touches: 1,
        swipe_max_touches: 1,
        drag_block_vertical: false,

        parallax: "mouse",
        parallaxBgFreeze: "on",
        parallaxLevels: [7, 4, 3, 2, 5, 4, 3, 2, 1, 0],

        keyboardNavigation: "off",

        navigationHAlign: "center",
        navigationVAlign: "bottom",
        navigationHOffset: 0,
        navigationVOffset: 40,

        soloArrowLeftHalign: "left",
        soloArrowLeftValign: "center",
        soloArrowLeftHOffset: 20,
        soloArrowLeftVOffset: 0,

        soloArrowRightHalign: "right",
        soloArrowRightValign: "center",
        soloArrowRightHOffset: 20,
        soloArrowRightVOffset: 0,

        shadow: 0,
        fullWidth: "on",
        fullScreen: "off",

        spinner: "spinner4",

        stopLoop: "off",
        stopAfterLoops: -1,
        stopAtSlide: -1,

        shuffle: "off",

        autoHeight: "off",
        forceFullWidth: "on",

        hideThumbsOnMobile: "on",
        hideNavDelayOnMobile: 1500,
        hideBulletsOnMobile: "on",
        hideArrowsOnMobile: "on",
        hideThumbsUnderResolution: 0,

        hideSliderAtLimit: 0,
        hideCaptionAtLimit: 0,
        hideAllCaptionAtLilmit: 0,
        startWithSlide: 0,
        videoJsPath: "",
        fullScreenOffsetContainer: ""
      });

    }

    //Tabs Box
    if (jQuery('.tabs-box').length) {
      jQuery('.tabs-box .tab-buttons .tab-btn').on('click', (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        var target = jQuery(jQuery(this).attr('data-tab'));

        target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
        jQuery(this).addClass('active-btn');
        target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
        target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
        jQuery(target).fadeIn(300);
        jQuery(target).addClass('active-tab');
      });
    }


    //Single Item Carousel
    // if (jQuery('.single-item-carousel').length) {
    //   jQuery('.single-item-carousel').owlCarousel({
    //     loop: true,
    //     margin: 0,
    //     nav: true,
    //     smartSpeed: 700,
    //     autoplay: 5000,
    //     navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
    //     responsive: {
    //       0: {
    //         items: 1
    //       },
    //       1024: {
    //         items: 1
    //       },
    //       1200: {
    //         items: 1
    //       }
    //     }
    //   });
    // }


    //Shop Tabs Box
    if (jQuery('.shop-tabs-box').length) {
      jQuery('.shop-tabs-box .tab-buttons .tab-btn').on('click', (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        var target = jQuery(jQuery(this).attr('data-tab'));

        target.parents('.shop-tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
        jQuery(this).addClass('active-btn');
        target.parents('.shop-tabs-box').find('.tabs-content').find('.shop-tab').removeClass('active-tab');
        jQuery(target).addClass('active-tab');
      });
    }


    //Tabbed Shop Carousel
    if (jQuery('.tabbed-shop-carousel').length) {
      jQuery('.tabbed-shop-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        smartSpeed: 700,
        autoplay: 5000,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1024: {
            items: 3
          },
          1200: {
            items: 4
          }
        }
      });
    }

    //Related Items Carousel
    if (jQuery('.related-items-carousel').length) {
      jQuery('.related-items-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        smartSpeed: 700,
        autoplay: 5000,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1140: {
            items: 2
          },
          1200: {
            items: 3
          }
        }
      });
    }


    //Sponsors Carousel
    if (jQuery('.sponsors-carousel').length) {
      jQuery('.sponsors-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        smartSpeed: 500,
        autoplay: 5000,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          800: {
            items: 3
          },
          1024: {
            items: 4
          },
          1200: {
            items: 5
          }
        }
      });
    }

    //Footer Gallery Widget Carousel
    if (jQuery('.gallery-widget-carousel').length) {
      jQuery('.gallery-widget-carousel').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        smartSpeed: 500,
        autoplay: 5000,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
          0: {
            items: 3
          },
          600: {
            items: 4
          },
          1024: {
            items: 3
          },
          1200: {
            items: 4
          }
        }
      });
    }

    //Two Column Carousel
    if (jQuery('.two-column-carousel').length) {
      jQuery('.two-column-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        smartSpeed: 500,
        autoplay: 5000,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          1024: {
            items: 2
          },
          1200: {
            items: 2
          }
        }
      });
    }

    //Member Experties Carousel
    if (jQuery('.experties-carousel').length) {
      jQuery('.experties-carousel').owlCarousel({
        loop: true,
        margin: 30,
        nav: true,
        smartSpeed: 700,
        autoplay: 5000,
        navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 2
          },
          1024: {
            items: 2
          },
          1200: {
            items: 3
          }
        }
      });
    }


    //LightBox / Fancybox
    if (jQuery('.lightbox-image').length) {
      jQuery('.lightbox-image').fancybox({
        openEffect: 'fade',
        closeEffect: 'fade',
        helpers: {
          media: {}
        }
      });
    }

    //Mixitup Gallery
    if (jQuery('.filter-list').length) {
      jQuery('.filter-list').mixItUp({});
    }


    //Sortable Masonary with Filters
    // const enableMasonry = () => {
    //   if (jQuery('.sortable-masonry').length) {

    //     var winDow = jQuery(window);
    //     // Needed variables
    //     var jQuerycontainer = jQuery('.sortable-masonry .items-container');
    //     var jQueryfilter = jQuery('.filter-btns');

    //     jQuerycontainer.isotope({
    //       filter: '*',
    //       masonry: {
    //         columnWidth: 0
    //       },
    //       animationOptions: {
    //         duration: 1000,
    //         easing: 'linear'
    //       }
    //     });


    //     // Isotope Filter
    //     // jQueryfilter.find('li').on('click', () => {
    //     //   var selector = jQuery(this).attr('data-filter');

    //     //   try {
    //     //     jQuerycontainer.isotope({
    //     //       filter: selector,
    //     //       animationOptions: {
    //     //         duration: 1000,
    //     //         easing: 'linear',
    //     //         queue: false
    //     //       }
    //     //     });
    //     //   } catch (err) {

    //     //   }
    //     //   return false;
    //     // });


    //     // winDow.bind('resize', function () {
    //     //   var selector = jQueryfilter.find('li.active').attr('data-filter');

    //     //   jQuerycontainer.isotope({
    //     //     filter: selector,
    //     //     animationOptions: {
    //     //       duration: 1000,
    //     //       easing: 'linear',
    //     //       queue: false
    //     //     }
    //     //   });
    //     // });


    //     var filterItemA = jQuery('.filter-btns li');

    //     filterItemA.on('click', () => {
    //       var jQuerythis = jQuery(this);
    //       if (!jQuerythis.hasClass('active')) {
    //         filterItemA.removeClass('active');
    //         jQuerythis.addClass('active');
    //       }
    //     });
    //   }
    // }

    // enableMasonry();

    //Jquery Spinner / Quantity Spinner
    if (jQuery('.quantity-spinner').length) {
      jQuery("input.quantity-spinner").TouchSpin({
        verticalbuttons: true
      });
    }


    // Fact Counter
    const factCounter = () => {
      if (jQuery('.fact-counter').length) {
        jQuery('.fact-counter .counter-column.animated').each(() => {

          var jQueryt = jQuery(this),
            n = jQueryt.find(".count-text").attr("data-stop"),
            r = parseInt(jQueryt.find(".count-text").attr("data-speed"), 10);

          if (!jQueryt.hasClass("counted")) {
            jQueryt.addClass("counted");
            jQuery({
              countNum: jQueryt.find(".count-text").text()
            }).animate({
              countNum: n
            }, {
              duration: r,
              easing: "linear",
              step: function () {
                jQueryt.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                jQueryt.find(".count-text").text(this.countNum);
              }
            });
          }

        });
      }
    }

    //Product Tabs
    if (jQuery('.prod-tabs .tab-btn').length) {
      jQuery('.prod-tabs .tab-btn').on('click', (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        var target = jQuery(jQuery(this).attr('href'));
        jQuery('.prod-tabs .tab-btn').removeClass('active-btn');
        jQuery(this).addClass('active-btn');
        jQuery('.prod-tabs .tab').fadeOut(0);
        jQuery('.prod-tabs .tab').removeClass('active-tab');
        jQuery(target).fadeIn(500);
        jQuery(target).addClass('active-tab');
      });

    }


    //Contact Form Validation
    if (jQuery('#contact-form').length) {
      jQuery('#contact-form').validate({
        rules: {
          username: {
            required: true
          },
          email: {
            required: true,
            email: true
          },
          phone: {
            required: true
          },
          subject: {
            required: true
          },
          message: {
            required: true
          }
        }
      });
    }


    // Scroll to a Specific Div
    if (jQuery('.scroll-to-target').length) {
      jQuery(".scroll-to-target").on('click', () => {
        var target = jQuery(this).attr('data-target');
        // animate
        jQuery('html, body').animate({
          scrollTop: jQuery(target).offset().top
        }, 1000);

      });
    }


    // Elements Animation
    // if (jQuery('.wow').length) {
    //   var wow: any = new wow(
    //     {
    //       boxClass: 'wow',      // animated element css class (default is wow)
    //       animateClass: 'animated', // animation css class (default is animated)
    //       offset: 0,          // distance to the element when triggering the animation (default is 0)
    //       mobile: true,       // trigger animations on mobile devices (default is true)
    //       live: true       // act on asynchronously loaded content (default is true)
    //     }
    //   );
    //   wow.init();
    // }


    /* ==========================================================================
       When document is Scrollig, do
       ========================================================================== */

    jQuery(window).on('scroll', function () {
      headerStyle();
      factCounter();
    });


    /* ==========================================================================
       When window is Resized, do
       ========================================================================== */

    // jQuery(window).on('resize', function () {
    //   enableMasonry();
    // });

    /* ==========================================================================
       When document is loading, do
       ========================================================================== */

    // jQuery(this['rev_slider'].nativeElement).show().revolution(RevSliderConfig);
  }
}
