import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockUserService } from '../service/mockUser.service';
import { UserService } from '../service/user.service';

import { UserComponent } from './user.component';
import { UsersNewComponent } from './users-new/users-new.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
          RouterTestingModule.withRoutes(
          [
            {
              path: 'tasks-new', component: UsersNewComponent
            }
          ])],
      declarations: [UserComponent, UsersNewComponent],
      providers: [UserService]
    })
  });

  beforeEach(() => {
    TestBed.overrideComponent(UserComponent, {set: {providers: [{provide: UserService, useClass: MockUserService}]}});
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show table of users', () => {
    fixture.detectChanges();
    fixture.detectChanges();
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(4);
    let row1 = tableRows[1];
    expect(row1.cells[0].innerHTML).toBe('John Doe');
    let row2 = tableRows[2];
    expect(row2.cells[0].innerHTML).toBe('Martha Johnson')
  });

  it('should render Nieuwe gebruiker button', fakeAsync(() => {
    const newTaskButton = fixture.debugElement.nativeElement.querySelector("#new-user");
    expect(newTaskButton).toBeTruthy();
  }));

  it('check new-users routing', fakeAsync(() => {
    let href = fixture.debugElement.query(By.css('#new-user')).nativeElement.getAttribute('href');
    expect(href).toEqual('/users-new');
  }));

});
