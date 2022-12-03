import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { HomeComponent } from 'src/app/home/home.component';
import { TasksComponent } from 'src/app/tasks/tasks.component';
import { HeaderComponent } from './header.component';
import { routes} from 'src/app/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/service/user.service';
import { MockUserService } from 'src/app/service/mockUser.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterModule.forRoot([]), FormsModule, ReactiveFormsModule, NgbModule,RouterTestingModule.withRoutes(routes)],
      declarations: [ 
        HeaderComponent,
        HomeComponent,
        TasksComponent,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideComponent(HeaderComponent, {set: {providers: [{provide: UserService,  useClass: MockUserService}] }});
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set image logo path as expected', () => {
   const ele1 = fixture.debugElement.nativeElement.querySelector("#logo");
   expect(ele1['src']).toContain('logo_transparent.png');
  });
});
