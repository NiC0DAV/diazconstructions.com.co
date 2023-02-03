import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})

@Injectable({
  providedIn: 'root'
})
export class ProspectsService {

  public url: string;
  public token: any;
  public identity: any;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = global.url;
  }

  getProspects(token: any) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.get(this.url + 'getProspects', { headers: headers });
  }
}
