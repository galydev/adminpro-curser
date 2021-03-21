import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm =  this.formBuilder.group({
    name: ['Jhonatan', [Validators.required, Validators.minLength(3)]],
    email: ['user@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    password2: ['123456', [Validators.required]],
    terms: [true, [Validators.required]],
  }, {
    validators: this.equalsPasswords('password', 'password2')
  });

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  createUser(){
    this.formSubmitted = true;
    console.log(this.registerForm.value);
    if (this.registerForm.invalid) {
      return
    } 
    this.userService.createUser(this.registerForm.value)
        .subscribe(resp => {
          
          //navigate dashboard
          this.router.navigateByUrl('/');
        }, err => {
          // Swal.fire(err.error.msg, 'error');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: err.error.msg,
          })
        });
    
  }

  noValidField(field: string) : boolean {
    return ( this.registerForm.get(field).invalid && this.formSubmitted ) ? true : false;
  }

  acceptTerms(): boolean {
    return ( !this.registerForm.get('terms').value && this.formSubmitted ) ? true : false;
  }

  validFieldsPassword(): boolean {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    return (pass1 !== pass2 && this.formSubmitted) ? true: false;
  } 

  equalsPasswords(password1Name: string, password2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(password1Name);
      const pass2Control = formGroup.get(password2Name);
      return pass1Control.value === pass2Control.value ? pass2Control.setErrors(null) : pass2Control.setErrors( {noIsEqual: true });
    }
  }
}
