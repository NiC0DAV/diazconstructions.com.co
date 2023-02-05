import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare var jQuery: any;
declare var $: any;
// declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user: any = {};
  public userStorage: any = {};
  public token: any = '';
  public Toast: any;
  public loader: boolean;

  constructor(
    private _userService: UserService,
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
  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['/']);
    }else{
      this._router.navigate(['/login']);
    }
  }

  login(loginForm: any) {
    if (loginForm.valid) {
      this.loader = true;
      let data = {
        email: this.user.email,
        password: this.user.password
      }

      this._userService.loginAdmin(data).subscribe(
        (response: any) => {
          // console.log(response);
          if (response.code != 200) {
            this.loader = false;
            this.Toast.fire({
              icon: 'error',
              title: response.message
            });
          } else {
            this.userStorage = response.data;
            localStorage.setItem('token', response.accessToken);
            this.loader = false;
            this.Toast.fire({
              icon: 'success',
              title: response.message
            });
            this._router.navigate(['/']);
          }
        },
        (error: any) => {
          // console.log(error.error);
          this.loader = false;
          this.Toast.fire({
            icon: 'error',
            title: error.error.message
          })
        }
      );
    } else {
      this.Toast.fire({
        icon: 'error',
        title: 'The data entered on the form is invalid, please try it again.'
      })
    }
  }
}
