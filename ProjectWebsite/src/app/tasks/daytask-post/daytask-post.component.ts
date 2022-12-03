import { CdkDragDrop, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DurationhelperService } from 'src/app/helpers/durationhelper.service';
import { Task } from 'src/app/models/Task';
import { User } from 'src/app/models/User';
import { TaskService } from 'src/app/service/task.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-daytask-post',
  templateUrl: './daytask-post.component.html',
  styleUrls: ['./daytask-post.component.scss']
})
export class DaytaskPostComponent implements OnInit {
  @Input() createTask: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    symbolFile: new FormControl(''),
    type: new FormControl('dagtaak'),
    private_template: new FormControl(true, [Validators.required]),
    public_template: new FormControl(false),
    user_id: new FormControl(''),
    duration: new FormControl(''),
    deleted: new FormControl(false),
  });
  users: User[];
  allTasks: Task[];
  dayTasks: Task[];
  normalTasks: Task[];
  individualTasks: Task[];
  initialList: any[];
  submitted: boolean;
  imageSrc: string;
  b64: string;
  timeList: any[];
  times: string[];
  
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
    private readonly userService: UserService,
    private durationHelperService: DurationhelperService,
  ) {
    this.users = [];
    this.allTasks = [];
    this.dayTasks = [];
    this.normalTasks = [];
    this.individualTasks = [];
    this.initialList = [];
    this.submitted = false;
    this.imageSrc = '';
    this.b64 = '';
    this.timeList = [];
    this.times = [];
  }

  ngOnInit(): void {
    this.FillAllTaskLists();
    this.GetUsers();
  }
  
  FillAllTaskLists() {
    this.taskService.GetTasks().subscribe(request => {
      this.allTasks = request.data;
      this.dayTasks = this.allTasks.filter(task => task.type === 'dagtaak')
      this.normalTasks = this.allTasks.filter(task => task.type === 'normale taak')
      this.individualTasks = this.allTasks.filter(task => task.type === 'taak in taak')
    });
  }
  
  GetUsers() {
    this.userService.GetUsers().subscribe(request => {
      this.users = request.data;
      this.users = this.users.filter(user => user.role === 'Client');
    });
  }

  CreateTask() {
    this.submitted = true;
    this.createTask.value.symbol = this.b64;
    this.createTask.value.public_template = !this.createTask.value.private_template;

    if (this.CheckTimes() && this.createTask.dirty && this.createTask.valid) {
      this.taskService.PostTasks(this.createTask.value).subscribe((request) => {
        let task = request.data;

        for (let i = 0; i < this.initialList.length; i++) {
          let temp = { '_id': 'test', 'time': '00:00:00', 'position': 1 };
          temp._id = this.initialList[i]._id;
          temp.time = this.times[i];
          temp.position = i + 1;
          task.tasks.push(temp);
        }
        this.times = [];
        console.log(this.createTask.value);
        this.taskService.BindTask(task).subscribe((request) => {
          this.router.navigate(['/tasks']);
        });
      });
    } else {
      this.times = [];
      alert('Naam is een verplicht veld. Controlleer ook of al je deeltaken waar een tijd verplicht is, is ingevuld.')
    }
  }

  CheckTimes() {
    let inputs = document.getElementsByClassName('small-input');
    const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    var correctTimes = true;

    for (let i = 0; i < inputs.length; i++) {
      const element: any = inputs[i];
      var time: any = element.value;
      if (!regex.test(time)) {
        correctTimes = false;
        break;
      }
      this.times.push(time);
    }
    if (this.times.length !== this.initialList.length) {
      correctTimes = false;
    }
    if (this.checkTimeOverlap()) {
      correctTimes = false;
    }
    return correctTimes;
  }

  checkTimeOverlap() {
    var overlap: boolean = false;
    const regex = /^00:00:[0-5][0-9]$/;

    for (let i = 0; i < this.times.length; i++) {
      const time = this.times[i];
      var startTime = time;
      var duration = this.initialList[i].duration;

      if (regex.test(duration) || duration === '') {
        duration = '00:01:00'
      }
      var totalSeconds = Math.abs(this.toSeconds(time + ':00') + this.toSeconds(duration));
      var endTimeWithSeconds = this.toTimeString(totalSeconds);
      var endTime = endTimeWithSeconds.substring(0, 5);

      if (this.validate(startTime, endTime)) {
        this.timeList.push({
          startTime: startTime,
          endTime: endTime
        });
      } else {
        overlap = true;
        break;
      }
    }
    this.timeList = [];
    return overlap;
  }

  validate(sTime: any, eTime: any) {
    if (+this.getDate(sTime) < +this.getDate(eTime)) {
      var len = this.timeList.length;
      return len > 0 ? (+this.getDate(this.timeList[len - 1].endTime) < +this.getDate(sTime)) : true;
    } else {
      return false;
    }
  }

  getDate(time: any) {
    var today = new Date();
    var _t = time.split(":");
    today.setHours(_t[0], _t[1], 0, 0);
    return today;
  }

  toTimeString(seconds: any) {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  }

  toSeconds(time_str: string) {
    // Extract hours, minutes and seconds
    var parts: any = time_str.split(':');
    // compute  and return total seconds
    return parts[0] * 3600 + // an hour has 3600 seconds
      parts[1] * 60 +   // a minute has 60 seconds
      +parts[2];        // seconds
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
}
