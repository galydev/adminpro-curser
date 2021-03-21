import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/services/user.service';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;
  public auth2: any;

  public loginForm =  this.formBuilder.group({
    email: [this.getEmailRemember(), [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember: [false]
  });

  constructor( private router: Router,
               private formBuilder: FormBuilder,
               private userService: UserService,
               private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(): void {
    
    if(this.loginForm.invalid) {
      return;
    }

    this.userService.loginForm(this.loginForm.value)
      .subscribe(resp => {
        this.setRememeberStorage();
        //navigate dashboard
        this.router.navigateByUrl('/');
      }, (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error.msg,
        })
      });
    //this.router.navigateByUrl('/');
  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp();
  }

  async startApp() {
    this.userService.googleInit();
    this.auth2 = this.userService.auth2;
    
    this.attachSignin(document.getElementById('my-signin2'));
  };

  attachSignin(element) {
    this.auth2.attachClickHandler( element, {},
      (googleUser) => {
        var id_token = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(id_token)
          .subscribe(resp => {
            //navigate dashboard
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            })
          });
        
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  getEmailRemember() : string{
    return localStorage.getItem('email') || '';
  }

  setRememeberStorage(){
    if(this.loginForm.get('remember').value) {
      localStorage.setItem('email', this.loginForm.get('email').value);
    } else {
      localStorage.removeItem('email');
    }
  }


}
