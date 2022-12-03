import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MockUserService } from 'src/app/service/mockUser.service';
import { UserService } from 'src/app/service/user.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { UserTaskComponent } from './user-task.component';
import { of } from 'rxjs';

describe('UserTaskComponent', () => {
  let component: UserTaskComponent;
  let fixture: ComponentFixture<UserTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterModule.forRoot([]), FormsModule, ReactiveFormsModule],
      declarations: [ UserTaskComponent ],
      providers: [UserService, { provide: ActivatedRoute, useValue: {params: of({id: 1})}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideComponent(UserTaskComponent, {set: {providers: [{provide: UserService,  useClass: MockUserService}] }});
    fixture = TestBed.createComponent(UserTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
