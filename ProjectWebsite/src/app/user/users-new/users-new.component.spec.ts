import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

import { UsersNewComponent } from './users-new.component';

describe('UsersNewComponent', () => {
  let component: UsersNewComponent;
  let fixture: ComponentFixture<UsersNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterModule.forRoot([]), FormsModule, ReactiveFormsModule],
      declarations: [ UsersNewComponent ],
      providers: [UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should get error when fields not filled', fakeAsync(() => {
    expect(component.createUser.controls['firstname'].errors).toBeTruthy();
    expect(component.createUser.controls['lastname'].errors).toBeTruthy();
    expect(component.createUser.controls['email'].errors).toBeTruthy();
    expect(component.createUser.controls['password'].errors).toBeTruthy();
    expect(component.createUser.controls['role'].errors).toBeTruthy();
  }));

  it('should get error when fields are filled', fakeAsync(() => {
    component.createUser.controls['firstname'].setValue('John');
    component.createUser.controls['lastname'].setValue('Doe');
    component.createUser.controls['email'].setValue('JohnDoe@mail.nl');
    component.createUser.controls['password'].setValue('password123');
    component.createUser.controls['role'].setValue('Berheerder');
    expect(component.createUser.controls['firstname'].errors).toBeFalsy();
    expect(component.createUser.controls['lastname'].errors).toBeFalsy();
    expect(component.createUser.controls['email'].errors).toBeFalsy();
    expect(component.createUser.controls['password'].errors).toBeFalsy();
    expect(component.createUser.controls['role'].errors).toBeFalsy();
  }));

  it('should get error when fields are not filled correctly', fakeAsync(() => {
    component.createUser.controls['firstname'].setValue('');
    component.createUser.controls['lastname'].setValue('');
    component.createUser.controls['email'].setValue('JohnDoe');
    component.createUser.controls['password'].setValue('pass');
    component.createUser.controls['role'].setValue('');
    expect(component.createUser.controls['firstname'].errors).toBeTruthy();
    expect(component.createUser.controls['lastname'].errors).toBeTruthy();
    expect(component.createUser.controls['email'].errors).toBeTruthy();
    expect(component.createUser.controls['password'].errors).toBeTruthy();
    expect(component.createUser.controls['role'].errors).toBeTruthy();
  }));

  it('should render Opslaan button', fakeAsync(()=> {
    const saveButton = fixture.debugElement.nativeElement.querySelector("#save-button");
    expect(saveButton).toBeTruthy();
  }));
  
});
