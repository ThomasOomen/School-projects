import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterModule.forRoot([]), FormsModule, ReactiveFormsModule, NgbModule],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('Test input field value email', async () => {
    const inputFieldDescription = fixture.debugElement.query(By.css('#email'));
    inputFieldDescription.nativeElement.value = 'text';
    inputFieldDescription.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputFieldDescription.nativeElement.value).toContain('text');
  });

  
  it('Test input field value password', async () => {
    const inputFieldDescription = fixture.debugElement.query(By.css('#password'));
    inputFieldDescription.nativeElement.value = 'text';
    inputFieldDescription.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputFieldDescription.nativeElement.value).toContain('text');
  });
});
