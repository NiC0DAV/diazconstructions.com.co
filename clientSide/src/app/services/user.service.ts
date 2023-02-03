import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public token: any;
  public identity: any;

  constructor(
    public _http: HttpClient
  ) {
    this.url = global.url;
  }

  loginAdmin(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'login', data, { headers: headers });
  }

  getToken(){
    return localStorage.getItem('token');
  }

  fetchWebData(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchAllWebInformation', { headers: headers });
  }

  fetchCategories(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchAllCategories', { headers: headers });
  }

  getImages(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchAllImages', { headers: headers });
  }

  getImagesByCategory(id: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'getImagesByCategory/'+id, { headers: headers });
  }

  prospectRegister(data: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'prospectRegister',data, { headers: headers });
  }

  reviewsRegister(data: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'reviewRegister',data, { headers: headers });
  }
  getReviews(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchReviews/', { headers: headers });
  }
}
