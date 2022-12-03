import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {
  @Input() createUser : FormGroup = this.formBuilder.group({
    firstname:  new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required]),
    deleted: new FormControl(false)
  });



  submitted = false;
  @Input() users: User[] = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly userService: UserService,
  ) { }
    
    ngOnInit(): void {
    }

  CreateUser() {
    this.submitted = true;
    if (this.createUser.dirty && this.createUser.valid) {
      this.userService.PostUsers(this.createUser.value).subscribe(request => {
        this.router.navigate(['/users'])},
        (error) => {
          if(error instanceof HttpErrorResponse && error.error == "Email already exists") {
            this.createUser.controls.email.setErrors({emailExist: true});
          }});      
    }
  }
}
