import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { JwtHelperService } from "@auth0/angular-jwt";

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

  getToken() {
    return localStorage.getItem('token');
  }

  public checkAuth(allowedRol: String[]): boolean {
    const token: any = localStorage.getItem('token');
    if (!this.token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);
      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      }
      // console.log(decodedToken);
      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }

    return allowedRol.includes(decodedToken['rol']);
  } 

  fetchUsers(token: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'fetchUsers', { headers: headers });
  }

  createUser(token: any, data: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.post(this.url + 'createUser', data, { headers: headers });
  }

  deleteUser(token: any, id: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.delete(this.url + 'userDelete/' + id, { headers: headers });
  }

  fetchUser(token: any, id: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'fetchUser/'+id, { headers: headers });
  }

  editUser(token: any, id: any, data: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.put(this.url + 'userUpdate/'+id, data, { headers: headers });
  }

  getReviews(token: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'fetchReviews', { headers: headers });
  }

  updateReview(id: any, data: any, token: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.put(this.url + 'reviewUpdate/'+id, data, { headers: headers });
  }

  reviewDelete(id: any, token: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.delete(this.url + 'reviewDelete/'+id, { headers: headers });
  }
  
}
