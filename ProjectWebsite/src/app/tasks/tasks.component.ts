import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/service/task.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  @Input() tasks: Task[] = [];
  allSubTasksIds: Object[] = []; 

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.GetTasks();
  }

  GetTasks() {
    this.taskService.GetTasks().subscribe(request =>{
      this.tasks = request.data;
      this.FilterTasksThatAreSubTasks();
    });
  }

  FilterTasksThatAreSubTasks() {
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if(task.tasks) {
        for (let index = 0; index < task.tasks.length; index++) {
          const subtask = task.tasks[index];
          this.allSubTasksIds.push(subtask._id);
        }
      }
    }
  }

  RemoveTask(_id: String) {
    this.taskService.RemoveTask(_id).subscribe(request => 
      this.GetTasks());
  }
}
