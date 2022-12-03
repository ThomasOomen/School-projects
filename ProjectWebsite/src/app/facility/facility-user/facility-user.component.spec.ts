import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';

import { of } from 'rxjs';
import { FacilityService } from 'src/app/service/facility.service';
import { MockFacilityService } from 'src/app/service/mockFacility.service';
import { MockUserService } from 'src/app/service/mockUser.service';
import { UserService } from 'src/app/service/user.service';
import { FacilityPutComponent } from '../facility-put/facility-put.component';

import { FacilityUserComponent } from './facility-user.component';

describe('FacilityUserComponent', () => {
  let component: FacilityUserComponent;
  let fixture: ComponentFixture<FacilityUserComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports:   [HttpClientModule,RouterModule.forRoot([]),  FormsModule, ReactiveFormsModule, MatTableModule], 
      declarations: [ FacilityUserComponent ],
      providers: [UserService, FacilityService, { provide: ActivatedRoute,useValue: {params: of({id: 123})}}]
    })
   
  });

  beforeEach(() => {
    TestBed.overrideComponent(FacilityUserComponent, {set: {providers: [ {provide: FacilityService,  useClass: MockFacilityService}, {provide: UserService,  useClass: MockUserService}] }});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(FacilityUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should show table of users', fakeAsync(() => {
      fixture.detectChanges();
      let tableRows = fixture.nativeElement.querySelectorAll('.testrow');
      expect(tableRows.length).toBe(2);
      let row1 = tableRows[0];   
      expect(row1.innerHTML).toBe(' Martha Johnson ')
  }));

  it('should show table of users in facility', fakeAsync(() => {
    fixture.detectChanges();
      let tableRows = fixture.nativeElement.querySelectorAll('.testrow1');
      expect(tableRows.length).toBe(1);
      let row1 = tableRows[0];
      expect(row1.innerHTML).toBe('John Doe');
  }));
});
