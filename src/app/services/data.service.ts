import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { 
    console.log('Data service connected')
  }

  getPictures() {
    return this.http.get('https://picsum.photos/list').pipe(
      tap(value => {
        console.log(value);
      })
    );
  }

  getAuthPictures(authorSelected:any): Observable<any> {
    return this.http.get('https://picsum.photos/list').pipe(
      tap(value => {
        console.log(value);
      })
    );
  }

}
