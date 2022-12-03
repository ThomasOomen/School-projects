import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() userLogin: FormGroup =  this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]), 
  });

  submitted = false;
  constructor(private readonly userService: UserService, private formBuilder: FormBuilder, private router: Router) { }
  
  ngOnInit(): void {
    
  }

  Login() {
    this.submitted = true;
    if (this.userLogin.dirty && this.userLogin.valid) {
    this.userService.Login(this.userLogin.value).subscribe(async res=> {
      localStorage.setItem('auth-token', res.headers.get('auth-token')) 
     this.router.navigate(['/'])
     .then(() => {
      window.location.reload();
  });
      }, 

      (error) => {
        if(error instanceof HttpErrorResponse && error.error == "Not the right password") {
          this.userLogin.controls.password.setErrors({passwordIncorrect: true});
        }})    
    }
  }

}

