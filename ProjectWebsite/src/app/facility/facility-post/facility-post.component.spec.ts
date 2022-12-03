import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { FacilityService } from 'src/app/service/facility.service';


import { FacilityPostComponent } from './facility-post.component';

describe('FacilityPostComponent', () => {
  let component: FacilityPostComponent ;
  let fixture: ComponentFixture<FacilityPostComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:   [HttpClientModule,RouterModule.forRoot([]),  FormsModule, ReactiveFormsModule], 
      declarations: [ FacilityPostComponent  ],
      providers: [FacilityService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacilityPostComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get error when fields not filled', fakeAsync(() => {
    expect(component.createFacility.controls['name'].errors).toBeTruthy();
    expect(component.createFacility.controls['email'].errors).toBeTruthy();
    expect(component.createFacility.controls['phonenumber'].errors).toBeTruthy();
    expect(component.createFacility.controls['zipcode'].errors).toBeTruthy();
    expect(component.createFacility.controls['housenumber'].errors).toBeTruthy();
  }));

  it('should get error when fields are filled', fakeAsync(() => {
    component.createFacility.controls['name'].setValue('Facility');
    component.createFacility.controls['email'].setValue('test@test.nl');
    component.createFacility.controls['phonenumber'].setValue('0612345678');
    component.createFacility.controls['zipcode'].setValue('1234AB');
    component.createFacility.controls['housenumber'].setValue('1');
    expect(component.createFacility.controls['name'].errors).toBeFalsy();
    expect(component.createFacility.controls['email'].errors).toBeFalsy();
    expect(component.createFacility.controls['phonenumber'].errors).toBeFalsy();
    expect(component.createFacility.controls['zipcode'].errors).toBeFalsy();
    expect(component.createFacility.controls['housenumber'].errors).toBeFalsy();
  }));

  it('should get error when fields are not filled correctly', fakeAsync(() => {
    component.createFacility.controls['name'].setValue('');
    component.createFacility.controls['email'].setValue('test@');
    component.createFacility.controls['phonenumber'].setValue('061234');
    component.createFacility.controls['zipcode'].setValue('123');
    component.createFacility.controls['housenumber'].setValue('');
    expect(component.createFacility.controls['name'].errors).toBeTruthy();
    expect(component.createFacility.controls['email'].errors).toBeTruthy();
    expect(component.createFacility.controls['phonenumber'].errors).toBeTruthy();
    expect(component.createFacility.controls['zipcode'].errors).toBeTruthy();
    expect(component.createFacility.controls['housenumber'].errors).toBeTruthy();
  }));

  it('should render Opslaan button', fakeAsync(()=> {
    const saveButton = fixture.debugElement.nativeElement.querySelector("#save-button");
    expect(saveButton).toBeTruthy();
  }));
  
});
