import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';
import { Directive, HostListener } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users-put',
  templateUrl: './users-put.component.html',
  styleUrls: ['./users-put.component.scss']
})
export class UsersPutComponent implements OnInit {

  @Input() updateUser : FormGroup = this.formBuilder.group({
    _id:  new FormControl('', [Validators.required]),
    firstname:  new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required])
  });
  
  sub: any;
  id: any;
  submitted = false;
  @Input() user: User = new User;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly userService: UserService,
    private router: Router
    ) { }

    ngOnInit(): void {
      this.sub = this.route.params.subscribe(params => {
        this.id = params.id
      });

      this.userService.GetUser(this.id).subscribe(request =>{
        this.user = request.data;
        this.updateUser.patchValue({
          _id: this.user?._id,
          firstname: this.user?.firstname,
          lastname: this.user?.lastname,
          email: this.user?.email,
          role: this.user?.role,
        })
      });
    }
    inputIsInvalid(control: AbstractControl): boolean {
      return control && !control.disabled && !control.valid && (control.touched || control.dirty);
    }

    UpdateUser() {
      this.submitted = true;
     
      if (this.updateUser.dirty && this.updateUser.valid) {
        this.userService.PutUser(this.updateUser.value).subscribe(request => {
          this.router.navigate(['/users']);
        },
          (error) => {
            if(error instanceof HttpErrorResponse && error.error == "Email already exists") {
              this.updateUser.controls.email.setErrors({emailExist: true});
          }
        });
      }
    }
}
