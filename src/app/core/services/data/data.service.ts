import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, take, tap } from 'rxjs';
import { environment } from '../../../../environment/environment.prod';
import { CacheService } from '../cache/cache.service';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  public BASEAPI = environment.baseUrl as string;
  navLink:string|undefined;
  body :any;

  setBody(body:any){
    this.body = body
  }

  getBody():any{
    return this.body
  }
  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) {}

  setNavLink(navLink:string){
    this.navLink = navLink
  }

  getNavLink():string|undefined{
    return this.navLink
  }

  getData(endPoint: string): Observable<any> {
    const cachedData = this.cacheService.get(endPoint);
    if (cachedData) {
      return of(cachedData);
    } else {
      return this.http.get(this.BASEAPI + endPoint).pipe(
        tap(data => this.cacheService.set(endPoint, data)),
        catchError((err) => of(err))
      );
    }
  }

  postData(endPoing: string, body: any): Observable<any> {
    return this.http.post(this.BASEAPI + endPoing, body).pipe(take(1));
  }

  updateData(endPoing: string, body: any): Observable<any> {
    return this.http.put(this.BASEAPI + endPoing, body).pipe(take(1));
  }

  deleteData(endPoing: string): Observable<any> {
    return this.http.delete(this.BASEAPI + endPoing).pipe(take(1));
  }


  handleError(err:any){
    if (err.error.message){

    }
  }
}
