import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  public url: string;
  public token: any;
  public identity: any;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = global.url;
  }

  fetchCategories() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchAllCategories', { headers: headers });
  }

  registerCategory(token: any, data: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.post(this.url + 'registerCategory',data, { headers: headers });
  }

  fetchCategoryById(token: any, id:String) {  
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'fetchCategoryById/'+id, { headers: headers });
  }

  updateCategory(token: any, id: String, data: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.put(this.url + 'updateCategory/'+id ,data, { headers: headers });
  }

  deleteCategory(token: any, id:String) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.delete(this.url + 'deleteCategory/'+id, { headers: headers });
  }

}
