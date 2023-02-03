import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { global } from './global';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  public url: string;
  public token: any;
  public identity: any;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = global.url;
  }

  imageRegister(token: any, data: any, file: any): Observable<any> {
    let headers = new HttpHeaders({'Authorization': token});
    const formData = new FormData();
    formData.append('imageTitle',data.imageTitle);
    formData.append('imageDescription',data.imageDescription);
    formData.append('shortDescription', data.shortDescription);
    formData.append('categoryId', data.imgCatId);
    formData.append('sliderStatus', data.sliderStatus);
    formData.append('imageStatus',data.imageStatus);
    formData.append('image', file);
    return this._http.post(this.url + 'uploadImage', formData, { headers: headers });
  }

  fetchImages(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'fetchAllImages', { headers: headers });
  }

  fetchImageById(id:any, token: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.post(this.url + 'getImageById/'+id, { headers: headers });
  }

  imageUpdate(token: any, data: any, file: any, id: any): Observable<any> {
    let headers = new HttpHeaders({'Authorization': token});
    const formData = new FormData();
    formData.append('imageTitle',data.imageTitle);
    formData.append('imageDescription',data.imageDescription);
    formData.append('shortDescription', data.shortDescription);
    formData.append('categoryId', data.categoryId);
    formData.append('sliderStatus', data.sliderStatus);
    formData.append('imageStatus',data.imageStatus);
    formData.append('image', file);
    return this._http.post(this.url + 'updateImage/' + id, formData, { headers: headers });
  }

  deleteImage(id:any, token: any): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', token);
    return this._http.delete(this.url + 'deleteImage/'+id, { headers: headers });
  }
}
