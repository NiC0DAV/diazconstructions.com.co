import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  public url: string;
  public token: any;
  public identity: any;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = global.url;
  }

  fetchWebData() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchAllWebInformation', { headers: headers });
  }

  fetchInformationById(id: any, token: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'fetchWebInformation/'+id, { headers: headers });
  }

  updateWebInformation(id: any, token: any, data: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.put(this.url + 'updateWebInformation/'+id, data, { headers: headers });
  }

  deleteWebInformation(id: any, token: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.delete(this.url + 'deleteWebInformation/'+id, { headers: headers });
  }

  registerWebInformation(token: any, data: any){
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.post(this.url + 'registerWebInformation',data, { headers: headers });
  }
}
