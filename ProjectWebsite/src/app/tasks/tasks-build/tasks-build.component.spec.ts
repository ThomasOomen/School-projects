import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TasksBuildComponent } from './tasks-build.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MockTaskService } from 'src/app/service/MockTask.service';
import { TaskService } from 'src/app/service/task.service';


describe('TasksBuildComponent', () => {
  let component: TasksBuildComponent;
  let fixture: ComponentFixture<TasksBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterModule.forRoot([]), FormsModule, ReactiveFormsModule, NgbModule, DragDropModule],
      declarations: [ TasksBuildComponent ]
    })
  });

  beforeEach(() => {
    TestBed.overrideComponent(TasksBuildComponent, { set: { providers: [{ provide: TaskService, useClass: MockTaskService }]}});
    fixture = TestBed.createComponent(TasksBuildComponent);
    component = fixture.componentInstance;
    TestBed.compileComponents();
    fixture.detectChanges();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
