import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';

const baseUrl = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public auth2:any;

  constructor(private http: HttpClient,
              private ngZone: NgZone ) {
    this.googleInit();
   }

  googleInit(){
    return new Promise(resolve => {
      console.log('google init');
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '939424695261-bb5leueat6e19508sv06aaksu5p80ckl.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        });

        resolve();
      });
    });    
  }

  logout(){
    localStorage.removeItem('token');
    this.auth2.signOut().then( () => {
      this.ngZone.run(()=>{});
    });
  }

  validToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${baseUrl}/login/renew`, {
      headers: {
        'x-token':token
      }
    }).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      }),
      map(resp => true),
      catchError(error => of(false) )
    );
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${baseUrl}/users`, formData)
            .pipe(
              tap((resp: any) => {
                localStorage.setItem('token', resp.token);
              })
            );
  }

  loginForm(formData: LoginForm) {
    return this.http.post(`${baseUrl}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }

  loginGoogle(token) {
    return this.http.post(`${baseUrl}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );
  }
}
