import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DurationhelperService } from 'src/app/helpers/durationhelper.service';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-tasks-build',
  templateUrl: './tasks-build.component.html',
  styleUrls: ['./tasks-build.component.scss'],
})
export class TasksBuildComponent implements OnInit {
  @Input() createTask: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    symbolFile: new FormControl(''),
    type: new FormControl('normale taak'),
    private_template: new FormControl(true, [Validators.required]),
    public_template: new FormControl(false),
    user_id: new FormControl(''),
    duration: new FormControl(''),
    deleted: new FormControl(false),
  });
  allTasks: Task[];
  dayTasks: Task[];
  normalTasks: Task[];
  individualTasks: Task[];
  initialList: any[];
  submitted: boolean;
  imageSrc: string;
  b64: string;

  //#region Drag & Drop
  returnDrop(event: CdkDragDrop<any, String[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  onDrop(event: CdkDragDrop<any, String[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  deleteEntry(_id: String) {
    if (this.initialList.some(e => e._id === _id)) {
      this.initialList.splice(this.initialList.findIndex(e => e._id === _id), 1);
    }
  }
  //#endregion

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly taskService: TaskService,
    private durationHelperService: DurationhelperService,
  ) {
    this.allTasks = [];
    this.dayTasks = [];
    this.normalTasks = [];
    this.individualTasks = [];
    this.initialList = [];
    this.submitted = false;
    this.imageSrc = '';
    this.b64 = '';
  }

  ngOnInit(): void {
    this.FillAllTaskLists();
  }

  FillAllTaskLists() {
    this.taskService.GetTasks().subscribe(request => {
      this.allTasks = request.data;
      this.dayTasks = this.allTasks.filter(task => task.type === 'dagtaak')
      this.normalTasks = this.allTasks.filter(task => task.type === 'normale taak')
      this.individualTasks = this.allTasks.filter(task => task.type === 'taak in taak')
    });
  }

  CreateTask() {
    this.submitted = true;
    this.createTask.value.symbol = this.b64;
    this.createTask.value.public_template = !this.createTask.value.private_template;
    console.log(this.initialList);
    let calculatedDuration = this.durationHelperService.CalculateDuration(this.initialList);
    this.createTask.value.duration = calculatedDuration;

    if (this.createTask.dirty && this.createTask.valid) {
      this.taskService.PostTasks(this.createTask.value).subscribe((request) => {
        let task = request.data;

        for (let i = 0; i < this.initialList.length; i++) {
          let temp = { '_id': 'test', 'time': '00:00:00', 'position': 1 };
          temp._id = this.initialList[i]._id;
          temp.time = this.initialList[i].time;
          temp.position = i + 1;
          task.tasks.push(temp);
        }
        this.taskService.BindTask(task).subscribe((request) => {
          this.router.navigate(['/tasks']);
        });
      });
    } else {
      alert('Naam is een verplicht veld. Controlleer ook of al je deeltaken waar een tijd verplicht is, is ingevuld.')
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.imageSrc = reader.result as string;
        this.b64 = this.imageSrc.split(',')[1];
      };
    }
  }

  EmptyImg() {
    this.imageSrc = '';
    this.b64 = '';
  }
}
