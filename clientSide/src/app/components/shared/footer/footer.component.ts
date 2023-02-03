import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  public webContent: any = {};
  public footerSection: any = {};
  public Toast: any;

  constructor(private _userService: UserService) {
    this.getWebContent();
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

  getWebContent() {
    this._userService.fetchWebData().subscribe(
      (response: any) => {
        for (let clave in response.data) {
          let val = response.data[clave];
          if (val.status == '2') {
            this.webContent = response.data[clave];
          }
        }

        this.footerSection = this.webContent.footerSection;
        console.log(this.footerSection);
      }
    );
  }

  prospectsFooterForm(data: any){
    if(data.valid){
      this._userService.prospectRegister(data.value).subscribe(
        ( response: any ) => {
          console.log(response);
          this.Toast.fire({
            icon: 'success',
            title: response.message
          });
        }, ( error: any ) => {
          console.log(error);
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
}
