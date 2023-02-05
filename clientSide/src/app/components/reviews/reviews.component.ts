import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent {

  public Toast: any;
  public rating: any;

  constructor(private _userService: UserService,private _router: Router) {
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

  receiveData($event: any) {

    this.rating = $event;
  }

  reviewsForm(data: any) {
    data.value.rating = this.rating;
    this._userService.reviewsRegister(data.value).subscribe(
      (response: any) => {
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
