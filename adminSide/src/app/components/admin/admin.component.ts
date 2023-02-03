import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { JwtHelperService } from "@auth0/angular-jwt";
import { InformationService } from 'src/app/services/information.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProspectsService } from 'src/app/services/prospects.service';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public imgSelected: any | ArrayBuffer = 'assets/images/01.jpg';
  public file: File = undefined;
  public helper: any = new JwtHelperService();
  public Toast: any;
  public loader: boolean;
  public dataChild: any;
  public content: any;
  public status: any;
  public statusCat: any;
  public action: String = '';
  public informationId: String = '';
  public token: any = '';
  public newStat: any = '';
  public newStatCat: any = '';
  public newStatImg: any = '';
  public userStat: any = '';
  public newUserStat: any = '';
  public userStatus: any = '';
  public userId: any = '';
  public sessionId: any;

  public categoryId: String = '';
  public imageId: String = '';
  public imgCatId: String = '';
  public usersId: String = '';

  public galleryQuantity: any;
  public newInfoReg: any = {};
  public welcomeSection: any = {};
  public servicesSection: any = {};
  public characteristicsSection: any = {};
  public footerSection: any = {};
  public socialMedia: any = {};
  public category: any = {};
  public newCatReg: any = {};
  public newImageReg: any = {};
  public categoryById: any = {};
  public imageById: any = {};
  public contents: Array<any> = [];
  public categories: Array<any> = [];
  public images: Array<any> = [];
  public activeGallery: Array<any> = [];
  public prospects: Array<any> = [];
  public users: Array<any> = [];
  public usersList: Array<any> = [];
  public usersById: any = {};
  public reviewsList: Array<any> = [];



  constructor(
    private _userService: UserService,
    private _informationService: InformationService,
    private _categoryService: CategoryService,
    private _imageService: ImageService,
    private _prospectService: ProspectsService,
    private _router: Router) {
      this.token = this._userService.getToken();
      this.loader = false;
      this.Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
  }

  ngOnInit() {
    let decodedToken = this.helper.decodeToken(this.token);
    // if (this.token && decodedToken.rol == "2" && decodedToken.status == "2") {
    //   if (this.helper.isTokenExpired(this.token)) {
    //     localStorage.clear();
    //     this._router.navigate(['login']);
    //   } else {
    //     this.sessionId = decodedToken.sub;
    //     this._router.navigate(['']);
    //   }
    // } else {
    //   this._router.navigate(['login']);
    // }
  }

  ngAfterViewInit() {
    this.fetchWebData();
    this.fetchCategories();
    this.fetchImages();
    this.getProspects();
    this.getUsers();
    this.getReviews();
    this.action = 'all'
  }

  killSession() {
    localStorage.clear();
    this._router.navigate(['login']);
  }

  receiveData($event: any) {
    this.dataChild = $event;
  }

  fetchWebData() {
    this._informationService.fetchWebData().subscribe(
      (response: any) => {
        this.contents = response.data;
      }
    );
  }

  fetchInformationById(id:any) {
    this._informationService.fetchInformationById(id, this.token).subscribe(
      (response: any) => { 
        this.action = 'edit';
        this.content = response.data;
        this.newStat = this.content.status;
        if(this.content.status == '2'){
          this.status = 'Activated';
        }else{
          this.status = 'Deactivated';
        }
        this.welcomeSection = response.data.welcomeSection;
        this.servicesSection = response.data.servicesSection;
        this.characteristicsSection = response.data.CharacteristicsSection;
        this.footerSection = response.data.footerSection;
        this.socialMedia = response.data;
        // console.log(this.footerSection);
      }
    );
  }

  updateInformation(id: any){
    // console.log(this.content.name);
    let data = 
    {
      "name": this.content.name,
      "status": this.newStat,
      "welcomeSection": {
          "sectionOne": {
              "title": this.welcomeSection.sectionOne.title,
              "subtitle": this.welcomeSection.sectionOne.subtitle,
              "desc": this.welcomeSection.sectionOne.desc
          },
          "sectionTwo": {
              "title": this.welcomeSection.sectionTwo.title,
              "subtitle": this.welcomeSection.sectionTwo.subtitle,
              "desc": this.welcomeSection.sectionTwo.desc
          },
          "sectionThree": {
              "title": this.welcomeSection.sectionThree.title,
              "subtitle": this.welcomeSection.sectionThree.subtitle,
              "desc": this.welcomeSection.sectionThree.desc
          },
          "sectionFour": {
              "title": this.welcomeSection.sectionFour.title,
              "subtitle": this.welcomeSection.sectionFour.subtitle,
              "desc": this.welcomeSection.sectionFour.desc
          } 
      },
      "servicesSection": {
          "sectionOne": {
              "title": this.servicesSection.sectionOne.title,
              "desc": this.servicesSection.sectionOne.desc
          },
          "sectionTwo": {
              "title": this.servicesSection.sectionTwo.title,
              "desc": this.servicesSection.sectionTwo.desc
          },
          "sectionThree": {
              "title": this.servicesSection.sectionThree.title,
              "desc": this.servicesSection.sectionThree.desc
          },
          "sectionFour": {
              "title": this.servicesSection.sectionFour.title,
              "desc": this.servicesSection.sectionFour.desc
          },
          "sectionFive": {
            "title": this.servicesSection.sectionFive.title,
            "desc": this.servicesSection.sectionFive.desc
          },
          "sectionSix": {
            "title": this.servicesSection.sectionSix.title,
            "desc": this.servicesSection.sectionSix.desc
          }
      },
      "CharacteristicsSection": {
          "sectionOne": {
            "title": this.characteristicsSection.sectionOne.title,
            "desc": this.characteristicsSection.sectionOne.desc
          },
          "sectionTwo": {
            "title": this.characteristicsSection.sectionTwo.title,
            "desc": this.characteristicsSection.sectionTwo.desc
          },
          "sectionThree": {
            "title": this.characteristicsSection.sectionThree.title,
            "desc": this.characteristicsSection.sectionThree.desc
          },
          "sectionFour": {
            "title": this.characteristicsSection.sectionFour.title,
            "desc": this.characteristicsSection.sectionFour.desc
          },
          "sectionFive": {
            "title": this.characteristicsSection.sectionFive.title,
            "desc": this.characteristicsSection.sectionFive.desc
          }
      },
      "footerSection": {
          "diazConstructionsFooterDesc": this.footerSection.diazConstructionsFooterDesc,
          "address": this.footerSection.address,
          "phone": this.footerSection.phone,
          "email": this.footerSection.email
      },
      "facebookUrl": this.socialMedia.facebookUrl,
      "instagramUrl": this.socialMedia.instagramUrl,
      "whatsappNumber": this.socialMedia.whatsappNumber
    };

    this._informationService.updateWebInformation(id, this.token, data).subscribe(
      (response: any) => {
        this.fetchInformationById(id);
        this.fetchWebData();
        this.Toast.fire({
          icon: 'success',
          title: response.message
        });
      }, (error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }

  changeStat(value: any){
    this.newStat = value;
    console.log(this.newStat);
    if(this.newStat == '2'){
      this.status = 'Activated';
    }else{
      this.status = 'Deactivated';
    }
  }

  deleteInformation(id: any) {
    this._informationService.deleteWebInformation(id, this.token).subscribe(
      (response: any) => {
        this.action = '';
        this.fetchWebData();

        this.Toast.fire({
          icon: 'success',
          title: response.message
        });
      }, (error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }

  newInformation(newInfoReg: any) {
    console.log(newInfoReg);
    let data = 
    {
      "name": newInfoReg.name,
      "welcomeSection": {
          "sectionOne": {
              "title": newInfoReg.WsectionOneTitle,
              "subtitle": newInfoReg.WsectionOneSubtitle,
              "desc": newInfoReg.WsectionOneDesc
          },
          "sectionTwo": {
              "title": newInfoReg.WsectionTwoTitle,
              "subtitle": newInfoReg.WsectionTwoSubtitle,
              "desc": newInfoReg.WsectionTwoDesc
          },
          "sectionThree": {
              "title": newInfoReg.WsectionThreeTitle,
              "subtitle": newInfoReg.WsectionThreeSubtitle,
              "desc": newInfoReg.WsectionThreeDesc
          },
          "sectionFour": {
              "title": newInfoReg.WsectionFourTitle,
              "subtitle": newInfoReg.WsectionFourSubtitle,
              "desc": newInfoReg.WsectionFourDesc
          } 
      },
      "servicesSection": {
          "sectionOne": {
              "title": newInfoReg.SsectionOneTitle,
              "desc": newInfoReg.SsectionOneDesc
          },
          "sectionTwo": {
              "title": newInfoReg.SsectionTwoTitle,
              "desc": newInfoReg.SsectionTwoDesc
          },
          "sectionThree": {
              "title": newInfoReg.SsectionThreeTitle,
              "desc": newInfoReg.SsectionThreeDesc
          },
          "sectionFour": {
              "title": newInfoReg.SsectionFourTitle,
              "desc": newInfoReg.SsectionFourDesc
          },
          "sectionFive": {
            "title": newInfoReg.SsectionFiveTitle,
            "desc": newInfoReg.SsectionFiveDesc
          },
          "sectionSix": {
            "title": newInfoReg.SsectionSixTitle,
            "desc": newInfoReg.SsectionSixDesc
          }
      },
      "CharacteristicsSection": {
          "sectionOne": {
            "title": newInfoReg.ChsectionOneTitle,
            "desc": newInfoReg.ChsectionOneDesc
          },
          "sectionTwo": {
            "title": newInfoReg.ChsectionTwoTitle,
            "desc": newInfoReg.ChsectionTwoDesc
          },
          "sectionThree": {
            "title": newInfoReg.ChsectionThreeTitle,
            "desc": newInfoReg.ChsectionThreeDesc
          },
          "sectionFour": {
            "title": newInfoReg.ChsectionFourTitle,
            "desc": newInfoReg.ChsectionFourDesc
          },
          "sectionFive": {
            "title": newInfoReg.ChsectionFiveTitle,
            "desc": newInfoReg.ChsectionFiveDesc
          }
      },
      "footerSection": {
          "diazConstructionsFooterDesc": newInfoReg.footerSectionDCFooterDesc,
          "address": newInfoReg.footerSectionEmail,
          "phone": newInfoReg.footerSectionPhone,
          "email": newInfoReg.footerSectionAddress
      },
      "facebookUrl": newInfoReg.socialMediaFacebookUrl,
      "instagramUrl": newInfoReg.socialMediaInstagramUrl,
      "whatsappNumber": newInfoReg.socialMediaWhatsappNumber
    };
    // console.log(data);
    this._informationService.registerWebInformation(this.token, data).subscribe(
      (response) => {
        this.action = '';
        this.fetchWebData();
        this.Toast.fire({
          icon: 'success',
          //@ts-ignore
          title: response.message
        });
      }, (error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }

  newCategory(newCatReg: any) {
    if (Object.entries(newCatReg).length == 0) {
      this.Toast.fire({
        icon: 'error',
        title: "All the fields are mandatory, please fill in all the fields."
      });
    } else {
      let data = JSON.stringify(newCatReg);
      this._categoryService.registerCategory(this.token, data).subscribe(
        (response: any) => {
          this.newCatReg = {};
          this.fetchCategories();
          this.Toast.fire({
            icon: 'success',
            title: response.message
          });
        }, (error: any) => {
          this.Toast.fire({
            icon: 'error',
            title: error.error.message
          });
        }
      );
    }
  }

  deleteCategory(categoryId: any) {
    if (categoryId == '') {
      this.Toast.fire({
        icon: 'error',
        title: "Can't delete the category, there is no category selected."
      });
    } else {
      this._categoryService.deleteCategory(this.token, categoryId).subscribe(
        (response: any) => {
          this.action = '';
          this.fetchCategories();
          this.Toast.fire({
            icon: 'success',
            title: response.message
          });
        }, (error: any) => {
          this.Toast.fire({
            icon: 'error',
            title: error.error.message
          });
        }
      );
    }
  }

  fetchCategories() {
    this._categoryService.fetchCategories().subscribe(
      (response: any) => {
        this.categories = response.data;
      }, (error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }

  fetchCategoryById(categoryId: any) {
    if (categoryId == '') {
      this.Toast.fire({
        icon: 'error',
        title: "Can't edit the category, there is no category selected."
      });
      this.action = '';
    } else {
      this.action = 'editCat';
      this._categoryService.fetchCategoryById(this.token, categoryId).subscribe(
        (response: any) => {
          this.categoryById = response.data;
          this.newStatCat = this.categoryById.status;
          console.log(this.newStatCat);
          if(this.newStatCat == '2'){
            this.statusCat = 'Activated';
          }else{
            this.statusCat = 'Deactivated';
          }
        }, (error: any) =>{
          this.Toast.fire({
            icon: 'error',
            title: error.error.message
          });
    
        }
      );
    }
  }

  changeStatCat(value: any){
    this.newStatCat = value;

    if(this.newStatCat == '2'){
      this.statusCat = 'Activated';
    }else{
      this.statusCat = 'Deactivated';
    }

    return this.newStatCat;
  }

  editCategory(categoryById: any, id: any) {
    delete categoryById.created_at;
    delete categoryById.updated_at;
    delete categoryById.id;

    let data = JSON.stringify(categoryById);

    this._categoryService.updateCategory(this.token, id, data).subscribe(
      (response: any) => {
        this.action = '';
        this.fetchCategories();
        this.Toast.fire({
          icon: 'success',
          title: response.message
        });
      }, (error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }

  newImage(data: any) {
    if (data) {
      console.log(this.file);
      console.log(data);
      this._imageService.imageRegister(this.token, data, this.file).subscribe(
        (response) => {
          this.action = '';
          this.fetchImages();
          this.Toast.fire({
            icon: 'success',
            title: response.message
          });
        }, (error) => {
          this.Toast.fire({
            icon: 'error',
            title: error.error.message
          });
        }
      );
    }
  }

  fileChangeEvent(event:any):void{
    var fileTemp;

    if(event.target.files && event.target.files[0]){
      fileTemp = <File>event.target.files[0];
    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'There was an error uploading the image'
      });
      $('#inputPortada').text('Seleccionar imagen');
      this.imgSelected = 'assets/images/01.jpg';
      this.file = undefined;
    }

    if(fileTemp.size <= 4000000){
      if(fileTemp.type == 'image/png' || fileTemp.type == 'image/webp' || fileTemp.type == 'image/jpg' || fileTemp.type == 'image/jpeg' || fileTemp.type == 'image/gif'){
        const fileReader = new FileReader();
        fileReader.onload = e => this.imgSelected = fileReader.result;
        // console.log(this.imgSelected);
        fileReader.readAsDataURL(fileTemp);

        $('#inputPortada').text(fileTemp.name)
        this.file = fileTemp;

      }else{
        this.Toast.fire({
          icon: 'error',
          title: 'There was an error uploading the image, the file format is not permitted.'
        });
        $('#inputPortada').text('Seleccionar imagen');
        this.imgSelected = 'assets/images/01.jpg';
        this.file = undefined;
      }
    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'There was an error uploading the image, the file size is greater than 4MB'
      });
      $('#inputPortada').text('Seleccionar imagen');
      this.imgSelected = 'assets/images/01.jpg';
      this.file = undefined;
    }
  }

  fetchImages() {
    this._imageService.fetchImages().subscribe(
      (response: any) => {
        this.images = response.data;
        for (let clave in this.images) {
          let val = this.images[clave];
          if (val.imageStatus == '2') {
            this.activeGallery[clave] = this.images[clave]; 
          }
        }
       this.galleryQuantity = Object.keys(this.activeGallery).length;
      }
    );
  }

  fetchImageById(id:any){
    if(id != ''){
      this._imageService.fetchImageById(id, this.token).subscribe(
        (response: any) => {
          this.action = 'editImage';
          this.imageById = response.data[0];
          console.log(this.imageById);
          this.imgSelected = 'http://127.0.0.1:8000/Storage/images/'+this.imageById.pathImage;
        },(error: any) => {
          this.Toast.fire({
            icon: 'error',
            title: error.error.message
          });
        }
      );
    }
  }

  editImage(id:any, data: any){
    if (data && id) {
      this._imageService.imageUpdate(this.token, data, this.file, id).subscribe(
        (response: any) => {
          this.action = '';
          this.fetchImages();
          this.Toast.fire({
            icon: 'success',
            title: response.message
          });
        }, (error: any) => {
          this.Toast.fire({
            icon: 'error',
            title: error.error.message
          });
        }
      );
    }
  }

  deleteImage(id: any){
    if(id){
      this._imageService.deleteImage(id, this.token).subscribe(
        (response: any) => {
          this.action = '';
          this.fetchImages();
          this.Toast.fire({
            icon: 'success',
            title: response.message
          });
        },(error: any) => {
          this.Toast.fire({
            icon: 'error',
            title: error.error.message
          });
        }
      );
    }
  }

  getProspects(){
    this._prospectService.getProspects(this.token).subscribe(
      (response: any) =>{
        this.prospects = response.data;
      }
    );
  }

  redMessage(prospect: any){
    Swal.fire({
      html:`<h3 class="mt-0">Read Message</h3>
      <div class="card-body">
        <div class="media mb-3">
            <div class="media-body" style="text-align: justify;">
            <ul>
              <p class="font-18 m-0"><strong>Contact Details:</strong></p>
              <li><p class="font-15 m-0"><strong>Prospect Name:</strong> ${prospect.name}</p></li>
              <li><p class="font-15 m-0"><strong>Prospect Email:</strong> ${prospect.email}</p></li>
              <li><p class="font-15 m-0"><strong>Prospect Phone Number:</strong> ${prospect.phoneNumber}</p></li>
            <ul>
            </div>
        </div>
        <hr>
        <div style="text-align: justify;">
          <p class="font-14">Dear Diaz Constructions,</p>
          <p class="font-14">${prospect.message}</p>
          <p class="font-14">Sincerily,</p>
          <p class="font-14">${prospect.name}</p>
        </div>
      </div>`,
      showCloseButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      cancelButtonText: 'Close Message'
    })
  }

  getUsers(){
    this._userService.fetchUsers(this.token).subscribe(
      ( response: any ) => {
        this.users = response.data;
        this.usersList = [];
        for (let clave in this.users) {
          let val = this.users[clave];
          if (val.status == '1' || val.status == '2') {
            this.usersList[clave] = this.users[clave]; 
          }
        }

        console.log(this.usersList);
      }, (error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }

  newUserRegister(data: any){
    if(data.valid){
      this._userService.createUser(this.token, data.value).subscribe(
        (response: any) => {
          this.getUsers();
          this.action = 'all';
          this.Toast.fire({
            icon: 'success',
            title: response.message
          });
        }, (error: any) => {
          this.Toast.fire({
            icon: 'error',
            title: error.error.message
          });
        }
      );
    }else{
      this.Toast.fire({
        icon: 'error',
        title: 'We are so sorry, there was an error, check the data you just entered and try it again.'
      });
    }
  }

  deleteUser(id: any){
    this._userService.deleteUser(this.token, id).subscribe(
      (response: any) => {
        this.getUsers();
        this.Toast.fire({
          icon: 'success',
          title: response.message
        });
      },(error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }

  getUserById(id: any){
    this.userId = '';
    this.action = 'editUser'
    this.userId = id;
    this._userService.fetchUser(this.token, id).subscribe(
      (response: any) => {
        this.usersById = response.data;
        this.userStat = this.usersById.status;

        if(this.userStat == '1'){
          this.userStatus = 'Deactivated';
        }else {
          this.userStatus = 'Activated';
        }
      }, (error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }

  changeUserStat(value: any){
    this.userStat = value;
    if(this.userStat == '2'){
      this.userStatus = 'Activated';
    }else{
      this.userStatus = 'Deactivated';
    }

    return value;
  }

  editUser(id: any, data: any){
    data.value.status= this.userStat;
    console.log(data.value);
    if(data.valid){
      this._userService.editUser(this.token, id, data.value).subscribe(
        (response: any) => {
          this.Toast.fire({
            icon: 'success',
            title: response.message
          });
          this.getUsers();
          this.action = 'all'
        }, (error: any) => {
          this.Toast.fire({
            icon: 'error',
            title: error.error.message
          });
        }
      );
    }
  }

  getReviews(){
    this._userService.getReviews(this.token).subscribe(
      (response: any) => {
        this.reviewsList = [];
        this.reviewsList = response.data;
        console.log(this.reviewsList);
      },(error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }

  updateReview(val: any, id: any){
    let data = {"reviewStatus": val};
    this._userService.updateReview(id, data, this.token).subscribe(
      (response: any) => {
        this.getReviews();
        this.Toast.fire({
          icon: 'success',
          title: response.message
        });
      },(error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }

  reviewDelete(id: any){
    this._userService.reviewDelete(id, this.token).subscribe(
      (response: any) => {
        this.getReviews();
        this.Toast.fire({
          icon: 'success',
          title: response.message
        });
      },(error: any) => {
        this.Toast.fire({
          icon: 'error',
          title: error.error.message
        });
      }
    );
  }
}
