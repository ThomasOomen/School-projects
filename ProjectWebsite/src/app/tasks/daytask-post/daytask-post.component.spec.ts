import { DragDropModule, CdkDropList } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { MockTaskService } from 'src/app/service/MockTask.service';
import { TaskService } from 'src/app/service/task.service';

import { DaytaskPostComponent } from './daytask-post.component';

describe('DaytaskPostComponent', () => {
  let component: DaytaskPostComponent;
  let fixture: ComponentFixture<DaytaskPostComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({

      imports: [HttpClientModule, RouterModule.forRoot([]), FormsModule, ReactiveFormsModule, NgbModule, DragDropModule, MatTabsModule, BrowserAnimationsModule],
      declarations: [DaytaskPostComponent, CdkDropList],
      providers: [TaskService, { provide: ActivatedRoute, useValue: { params: of({ id: 1 }) } }]
    })
  });

  beforeEach(() => {
    TestBed.overrideComponent(DaytaskPostComponent, { set: { providers: [{ provide: TaskService, useClass: MockTaskService }] } });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(DaytaskPostComponent);
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

  // User selection
  //#region 
  it('should create User selector', () => {
    const fileSelectionSymbol = fixture.debugElement.nativeElement.querySelector("#type-selection");
    expect(fileSelectionSymbol).toBeTruthy();
  });
  //#endregion


  //Buttons
  //#region 
  it('should render Opslaan button', async () => {
    const saveButton = fixture.debugElement.nativeElement.querySelector("#save-button");
    expect(saveButton).toBeTruthy();
  });

  it('should render Terug button', async () => {
    const backButton = fixture.debugElement.nativeElement.querySelector("#back-button");
    expect(backButton).toBeTruthy();
  });

  it('check back routing', async () => {
    let href = fixture.debugElement.query(By.css('#back-button')).nativeElement.getAttribute('href');
    expect(href).toEqual('/tasks');
  });
  //#endregion

  //Drag drop
  it('should render combined tasks', async () => {
    const saveButton = fixture.debugElement.nativeElement.querySelector("#combinedTasks");
    expect(saveButton).toBeTruthy();
  });

  it('mat-tab-labels exist', async () => {
    const elems = fixture.debugElement.queryAll(By.css('.mat-tab-labels'))
    expect(elems).toBeTruthy();
  });

  it('mat-tab-labels exist', async () => {
    const numberOfElements: number = 3;
    const elems = fixture.debugElement.queryAll(By.css('.mat-tab-labels'))
    expect(elems).toBeTruthy();
  });

  it('should default to the first tab', () => {
    checkSelectedIndex(0, fixture);
  });

  
  it('should change selected index on click', () => {
    let component = fixture.debugElement.componentInstance;
    component.selectedIndex = 0;
    checkSelectedIndex(0, fixture);

    // select the second tab
    let tabLabel = fixture.debugElement.queryAll(By.css('.mat-tab-label'))[1];
    tabLabel.nativeElement.click();
    checkSelectedIndex(1, fixture);

    // select the third tab
    tabLabel = fixture.debugElement.queryAll(By.css('.mat-tab-label'))[2];
    tabLabel.nativeElement.click();
    checkSelectedIndex(2, fixture);

    tabLabel = fixture.debugElement.queryAll(By.css('.mat-tab-label'))[3];
    tabLabel.nativeElement.click();
    const id = getSelectedLabel(fixture);
    console.log(id);
    checkSelectedIndex(3, fixture);
  });

});


function checkSelectedIndex(expectedIndex: number, fixture: ComponentFixture<any>) {
  fixture.detectChanges();

  let tabComponent: MatTabGroup = fixture.debugElement
    .query(By.css('mat-tab-group')).componentInstance;
  expect(tabComponent.selectedIndex).toBe(expectedIndex);
}

function getSelectedLabel(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.nativeElement.querySelector('.mdc-tab--active');
}

function getSelectedContent(fixture: ComponentFixture<any>): HTMLElement {
  return fixture.nativeElement.querySelector('.mat-mdc-tab-body-active');
}