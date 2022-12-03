import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { MockUserService } from 'src/app/service/mockUser.service';
import { UserService } from 'src/app/service/user.service';

import { ClientIndexComponent } from './client-index.component';

describe('ClientIndexComponent', () => {
  let component: ClientIndexComponent;
  let fixture: ComponentFixture<ClientIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:   [HttpClientModule,RouterModule.forRoot([]),  FormsModule, ReactiveFormsModule],
      declarations: [ ClientIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideComponent(ClientIndexComponent, {set: {providers: [ {provide: UserService,  useClass: MockUserService}] }});
    fixture = TestBed.createComponent(ClientIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show table of users of current user', () => {
    fixture.detectChanges();
    fixture.detectChanges();
    let tableRows = fixture.nativeElement.querySelectorAll('tr');
    expect(tableRows.length).toBe(2);
    let row1 = tableRows[1];
    expect(row1.cells[0].innerHTML).toBe('Martha Johnson')
  });
});
