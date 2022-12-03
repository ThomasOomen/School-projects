import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { TasksComponent } from './tasks.component';
import { TasksNewComponent } from './tasks-new/tasks-new.component';
import { TaskService } from '../service/task.service';

import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MockTaskService } from '../service/MockTask.service';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let tasksNewComponent: TasksNewComponent;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
          RouterTestingModule.withRoutes(
          [
            {
              path: 'tasks-new', component: TasksNewComponent
            }
          ])],
      declarations: [TasksComponent, TasksNewComponent],
      providers: [TaskService]
    })
  });

  beforeEach(() => {
    TestBed.overrideComponent(TasksComponent, {set: {providers: [{provide: TaskService, useClass: MockTaskService}]}});
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    tasksNewComponent = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    TestBed.compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show table of tasks', fakeAsync(() => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(3);
      let row1 = tableRows[1];
      expect(row1.cells[0].innerHTML).toBe('Task');
      let row2 = tableRows[2];
      expect(row2.cells[0].innerHTML).toBe('Task2')
    });
  }));

  it('should render Nieuwe taak button', fakeAsync(() => {
    const newTaskButton = fixture.debugElement.nativeElement.querySelector("#new-task");
    expect(newTaskButton).toBeTruthy();
  }));

  it('check new-tasks routing', fakeAsync(() => {
    let href = fixture.debugElement.query(By.css('#new-task')).nativeElement.getAttribute('href');
    expect(href).toEqual('/tasks-new');
  }));

});
