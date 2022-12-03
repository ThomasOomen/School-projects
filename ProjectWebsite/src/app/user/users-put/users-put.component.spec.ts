import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { MockUserService } from 'src/app/service/mockUser.service';

import { UserService } from 'src/app/service/user.service';

import { UsersPutComponent } from './users-put.component';

describe('UsersPutComponent', () => {
  let component: UsersPutComponent;
  let fixture: ComponentFixture<UsersPutComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterModule.forRoot([]), FormsModule, ReactiveFormsModule],
      declarations: [UsersPutComponent],
      providers: [UserService, { provide: ActivatedRoute, useValue: {params: of({id: 1})}}]
    })
  });

  beforeEach(() => {
    TestBed.overrideComponent(UsersPutComponent, {set: {providers: [{provide: UserService,  useClass: MockUserService}] }});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UsersPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get filled in by Get', fakeAsync(() => {
    let firstname =component.updateUser.controls['firstname'];
    expect(firstname.value).toBe('John');
    expect(component.updateUser.controls['firstname'].errors).toBeFalsy();
    expect(component.updateUser.controls['lastname'].errors).toBeFalsy();
    expect(component.updateUser.controls['email'].errors).toBeFalsy();
  }));

  
  it('should get error when fields not filled', fakeAsync(() => {
    component.updateUser.controls['firstname'].setValue('');
    component.updateUser.controls['lastname'].setValue('');
    component.updateUser.controls['email'].setValue('');
    expect(component.updateUser.controls['firstname'].errors).toBeTruthy();
    expect(component.updateUser.controls['lastname'].errors).toBeTruthy();
    expect(component.updateUser.controls['email'].errors).toBeTruthy();
  }));

  it('should get error when fields are filled', fakeAsync(() => {
    component.updateUser.controls['firstname'].setValue('John');
    component.updateUser.controls['lastname'].setValue('Doe');
    component.updateUser.controls['email'].setValue('JohnDoe@mail.nl');
    expect(component.updateUser.controls['firstname'].errors).toBeFalsy();
    expect(component.updateUser.controls['lastname'].errors).toBeFalsy();
    expect(component.updateUser.controls['email'].errors).toBeFalsy();
  }));

  it('should get error when fields are not filled correctly', fakeAsync(() => {
    component.updateUser.controls['firstname'].setValue('');
    component.updateUser.controls['lastname'].setValue('');
    component.updateUser.controls['email'].setValue('JohnDoe@');
    expect(component.updateUser.controls['firstname'].errors).toBeTruthy();
    expect(component.updateUser.controls['lastname'].errors).toBeTruthy();
    expect(component.updateUser.controls['email'].errors).toBeTruthy();
  }));

  it('should render Opslaan button', fakeAsync(()=> {
    const saveButton = fixture.debugElement.nativeElement.querySelector("#save-button");
    expect(saveButton).toBeTruthy();
  }));
});
