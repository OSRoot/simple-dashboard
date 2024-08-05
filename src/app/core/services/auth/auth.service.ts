import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable, catchError, from, switchMap, tap, throwError } from 'rxjs';
import { HelpersService } from '../helpers/helpers.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data/data.service';
import { environment } from '../../../../environment/environment.prod';
// Storage KEYS
const USER = 'user';
const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  BASEAPI:string = environment.baseUrl as string;
  isAuthenticated:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);

  constructor(
    private storage:Storage,
    private helper:HelpersService,
    private router:Router,
    private http:HttpClient,
    private data:DataService
  ) { }

    // #####################################################################
    get accessToken(): string | null {
      return localStorage.getItem(ACCESS_TOKEN);
    }
    // #####################################################################
    // #####################################################################
    async removeCredentials(): Promise<void> {
      localStorage.removeItem(ACCESS_TOKEN);
      await this.storage.remove(USER);
      // this.storage.clear()
      await this.storage.remove(REFRESH_TOKEN);
    }
    // #####################################################################

  async logOut(): Promise<void> {
    this.isAuthenticated.next(false)
    await this.helper.startLoading({});
    await this.removeCredentials();
    await this.helper.dismissLoading();
    this.router.navigateByUrl('/login',{replaceUrl:true})
  }

  //////////////////////////////////////////////////////////////////
  login(endPoint:string , form: any): Observable<any> {
    console.log(form);

  return this.http.post(this.BASEAPI+endPoint, form).pipe(
    switchMap((data: any) => {
      console.log(data);

      const { access_token, refresh_token } = data;
      return from(Promise.all([
        this.storage.set(REFRESH_TOKEN, refresh_token)
      ])).pipe(
        tap(() => {
          localStorage.setItem(ACCESS_TOKEN, access_token);
          this.isAuthenticated.next(true);
          this.router.navigateByUrl('/menu',{replaceUrl:true});
          // this.setUser();
        })
      );
    }),
    catchError((error) => {
      if(error.status===0){
        this.helper.presentGenericToaster({message:`App is not connected to the server ( ${error.statusText} )`})
      }
      else {
        this.helper.presentGenericToaster({message:error.error.message})
        console.log('Error:', error);
      }
      return throwError(error);
    })
  );
}
///////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////
getRefreshToken(): Observable<any> {
  const PROMISE: Promise<string> = new Promise(async (resolve, reject) => {
    const token: string = await this.storage.get(REFRESH_TOKEN);
    this.data.getData(`/auth/refresh-token?token=${token}`).subscribe(
      (res: any) => {
        localStorage.setItem(ACCESS_TOKEN, res.access_token);
        resolve(res.access_token);
      },
      (err) => reject(err)
    );
  });
  return from(PROMISE);
}


}
