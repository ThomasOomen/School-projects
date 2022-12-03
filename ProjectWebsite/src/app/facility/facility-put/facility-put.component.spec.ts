import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { FacilityService } from 'src/app/service/facility.service';
import { MockFacilityService } from 'src/app/service/mockFacility.service';


import { FacilityPutComponent } from './facility-put.component';

describe('FacilityPutComponent', () => {
  let component: FacilityPutComponent;
  let fixture: ComponentFixture<FacilityPutComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports:   [HttpClientModule,RouterModule.forRoot([]),  FormsModule, ReactiveFormsModule], 
      declarations: [ FacilityPutComponent ],
      providers: [FacilityService, { provide: ActivatedRoute,useValue: {params: of({id: 123})}}]
    })
   
  });

  beforeEach(() => {
    TestBed.overrideComponent(FacilityPutComponent, {set: {providers: [{provide: FacilityService,  useClass: MockFacilityService}] }});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(FacilityPutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get filled in by Get', fakeAsync(() => {
    let name =component.updateFacility.controls['name'];
    expect(name.value).toBe('Facility');
    expect(component.updateFacility.controls['name'].errors).toBeFalsy();
    expect(component.updateFacility.controls['email'].errors).toBeFalsy();
    expect(component.updateFacility.controls['phonenumber'].errors).toBeFalsy();
    expect(component.updateFacility.controls['zipcode'].errors).toBeFalsy();
    expect(component.updateFacility.controls['housenumber'].errors).toBeFalsy();
  }));

  
  it('should get error when fields not filled', fakeAsync(() => {
    component.updateFacility.controls['name'].setValue('');
    component.updateFacility.controls['email'].setValue('');
    component.updateFacility.controls['phonenumber'].setValue('');
    component.updateFacility.controls['zipcode'].setValue('');
    component.updateFacility.controls['housenumber'].setValue('');
    expect(component.updateFacility.controls['name'].errors).toBeTruthy();
    expect(component.updateFacility.controls['email'].errors).toBeTruthy();
    expect(component.updateFacility.controls['phonenumber'].errors).toBeTruthy();
    expect(component.updateFacility.controls['zipcode'].errors).toBeTruthy();
    expect(component.updateFacility.controls['housenumber'].errors).toBeTruthy();
  }));

  it('should get error when fields are filled', fakeAsync(() => {
    component.updateFacility.controls['name'].setValue('Facility');
    component.updateFacility.controls['email'].setValue('test@test.nl');
    component.updateFacility.controls['phonenumber'].setValue('0612345678');
    component.updateFacility.controls['zipcode'].setValue('1234AB');
    component.updateFacility.controls['housenumber'].setValue('1');
    expect(component.updateFacility.controls['name'].errors).toBeFalsy();
    expect(component.updateFacility.controls['email'].errors).toBeFalsy();
    expect(component.updateFacility.controls['phonenumber'].errors).toBeFalsy();
    expect(component.updateFacility.controls['zipcode'].errors).toBeFalsy();
    expect(component.updateFacility.controls['housenumber'].errors).toBeFalsy();
  }));

  it('should get error when fields are not filled correctly', fakeAsync(() => {
    component.updateFacility.controls['name'].setValue('');
    component.updateFacility.controls['email'].setValue('test@');
    component.updateFacility.controls['phonenumber'].setValue('061234');
    component.updateFacility.controls['zipcode'].setValue('123');
    component.updateFacility.controls['housenumber'].setValue('');
    expect(component.updateFacility.controls['name'].errors).toBeTruthy();
    expect(component.updateFacility.controls['email'].errors).toBeTruthy();
    expect(component.updateFacility.controls['phonenumber'].errors).toBeTruthy();
    expect(component.updateFacility.controls['zipcode'].errors).toBeTruthy();
    expect(component.updateFacility.controls['housenumber'].errors).toBeTruthy();
  }));

  it('should render Opslaan button', fakeAsync(()=> {
    const saveButton = fixture.debugElement.nativeElement.querySelector("#save-button");
    expect(saveButton).toBeTruthy();
  }));
});
