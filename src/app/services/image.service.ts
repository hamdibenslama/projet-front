import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private host = 'http://localhost:9100';
  constructor(private http: HttpClient) { }
  pushFileToStorage(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', this.host + '/upload/post', formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(this.host + '/upload/getallfiles');
  }
}
