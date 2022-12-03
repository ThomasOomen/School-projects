import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { MockTaskService } from '../../service/MockTask.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TasksNewComponent } from './tasks-new.component';
import { TaskService } from 'src/app/service/task.service';

describe('TasksNewComponent', () => {
  let component: TasksNewComponent;
  let fixture: ComponentFixture<TasksNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,RouterModule.forRoot([]), FormsModule, ReactiveFormsModule, NgbModule],
      declarations: [ TasksNewComponent ],
      providers: [TaskService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideComponent(TasksNewComponent, {set: {providers: [{provide: TaskService,  useClass: MockTaskService}] }});
    TestBed.compileComponents();
    fixture = TestBed.createComponent(TasksNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Task name input
  //#region 
  it('should create input field task name', () => {
    const inputFieldName = fixture.debugElement.nativeElement.querySelector("#name");
    expect(inputFieldName).toBeTruthy();
  });

  it('Test input field value name. ', async () => {
    const inputFieldName = fixture.debugElement.query(By.css('#name'));
    inputFieldName.nativeElement.value = 'text';
    inputFieldName.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputFieldName.nativeElement.value).toContain('text');
  });
  //#endregion
  
  // Description input
  //#region 
  it('should create input field description', () => {
      const inputFieldDescription = fixture.debugElement.nativeElement.querySelector("#description");
      expect(inputFieldDescription).toBeTruthy();
  });

  it('Test input field value description. ', async () => {
    const inputFieldDescription = fixture.debugElement.query(By.css('#description'));
    inputFieldDescription.nativeElement.value = 'text';
    inputFieldDescription.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputFieldDescription.nativeElement.value).toContain('text');
  });
  //#endregion

  // File selection
  //#region 
  it('should create file selector', () => {
    const fileSelectionSymbol = fixture.debugElement.nativeElement.querySelector("#symbolFile");
    expect(fileSelectionSymbol).toBeTruthy();
  });
  //#endregion

  //Checkbox 
  //#region 
  it('should create checkbox', () => {
    const checkboxTemplate = fixture.debugElement.nativeElement.querySelector("#template");
    expect(checkboxTemplate).toBeTruthy();
  });

  it('should click change value', () => {
    const checkboxTemplate = fixture.debugElement.nativeElement.querySelector("#template");
    expect(checkboxTemplate.checked).toBeTruthy(); // default state
    checkboxTemplate.click();
    fixture.detectChanges();
    expect(checkboxTemplate.checked).toBeFalsy(); // state after click
  });

  //#endregion

  //Buttons
  //#region 
  it('should render Opslaan button', async(() => {
    const saveButton = fixture.debugElement.nativeElement.querySelector("#save-button");
    expect(saveButton).toBeTruthy();
  }));

  it('should render Terug button', async(() => {
    const backButton = fixture.debugElement.nativeElement.querySelector("#back-button");
    expect(backButton).toBeTruthy();
  }));

  it('check back routing', async(() => {
    let href = fixture.debugElement.query(By.css('#back-button')).nativeElement.getAttribute('href');
    expect(href).toEqual('/tasks');
  }));
  //#endregion
});
