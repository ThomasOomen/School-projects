import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { FacilityService } from 'src/app/service/facility.service';
import { MockUserService } from 'src/app/service/mockUser.service';
import { UserService } from 'src/app/service/user.service';

import { UserUserComponent } from './user-user.component';

describe('UserUserComponent', () => {
  let component: UserUserComponent;
  let fixture: ComponentFixture<UserUserComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports:   [HttpClientModule,RouterModule.forRoot([]),  FormsModule, ReactiveFormsModule, MatTableModule], 
      declarations: [ UserUserComponent ],
      providers: [UserService, { provide: ActivatedRoute, useValue: {params: of({id: 1})}}]
    })
   
  });

  beforeEach(() => {
    TestBed.overrideComponent(UserUserComponent, {set: {providers: [ {provide: UserService,  useClass: MockUserService}] }});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(UserUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
   
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should show table of users', fakeAsync(() => {
      fixture.detectChanges();
      fixture.detectChanges();
      let tableRows = fixture.nativeElement.querySelectorAll('.testrow');
      expect(tableRows.length).toBe(1);
      let row1 = tableRows[0];   
      expect(row1.innerHTML).toBe(' Jenn Dean ')
  }));

  it('should show table of users connected to', fakeAsync(() => {
    fixture.detectChanges();
    fixture.detectChanges();
      let tableRows = fixture.nativeElement.querySelectorAll('.testrow1');
      expect(tableRows.length).toBe(1);
      let row1 = tableRows[0];
      expect(row1.innerHTML).toBe('Martha Johnson');
  }));
});