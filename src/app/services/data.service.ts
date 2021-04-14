import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 /* using HTTPClient to retrive data from API*/
  constructor(private http: HttpClient) { 
    console.log('Data service connected')
  }
 /* get all pictures and retrive data from API*/
  getPictures() {
    return this.http.get('https://picsum.photos/list').pipe(
      tap(value => {
        console.log(value);
      })
    );
  }
 /* get all pictures and retrive data from API depending on author selected*/
  getAuthPictures(authorSelected:any): Observable<any> {
    return this.http.get('https://picsum.photos/list').pipe(
      tap(value => {
        console.log(value);
      })
    );
  }

}
