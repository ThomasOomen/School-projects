import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { User } from 'src/app/models/User';
import { TaskService } from 'src/app/service/task.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-daytask-put',
  templateUrl: './daytask-put.component.html',
  styleUrls: ['./daytask-put.component.scss']
})
export class DaytaskPutComponent implements OnInit {
  @Input() updateTask: FormGroup = this.formBuilder.group({
    _id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    symbolFile: new FormControl(''),
    type: new FormControl('', [Validators.required]),
    private_template: new FormControl(true, [Validators.required]),
    public_template: new FormControl(false),
    tasks: new FormControl,
    user_id: new FormControl(''),
    duration: new FormControl(''),
    deleted: new FormControl(false)
  });
  task: Task = new Task;
  currentTaskId: any;
  subtasksOfTask: any[];
  users: User[];
  allTasks: Task[];
  dayTasks: Task[];
  normalTasks: Task[];
  individualTasks: Task[];
  initialList: any[];
  submitted: boolean;
  loading: boolean;
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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private readonly taskService: TaskService,
    private readonly userService: UserService,
  ) {
    this.subtasksOfTask = [];
    this.users = [];
    this.allTasks = [];
    this.dayTasks = [];
    this.normalTasks = [];
    this.individualTasks = [];
    this.initialList = [];
    this.submitted = false;
    this.loading = true;
    this.imageSrc = '';
    this.b64 = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentTaskId = params.id
    });

    this.taskService.GetTask(this.currentTaskId).subscribe(request => {
      this.task = request.data;
      this.updateTask.patchValue({
        _id: this.task?._id,
        name: this.task?.name,
        description: this.task?.description,
        symbol: this.task?.symbol,
        type: this.task?.type,
        private_template: this.task?.private_template,
        public_template: this.task?.public_template,
        tasks: this.task?.tasks,
        user_id: this.task?.user_id,
        duration: this.task?.duration,
      })
      this.FillInitialList();
      this.SetImageSrc();
      this.subtasksOfTask = this.task.tasks;
      this.loading = false;
    });
    this.FillAllTaskLists();
    this.GetUsers();
  }

  SetImageSrc() {
    if (this.task.symbol) {
      this.imageSrc = environment.urlAddress + this.task.symbol;
    }
  }

  GetUsers() {
    this.userService.GetUsers().subscribe(request => {
      this.users = request.data;
      this.users = this.users.filter(user => user.role === 'Client');
    });
  }

  FillAllTaskLists() {
    this.taskService.GetTasks().subscribe(request => {
      this.allTasks = request.data;
      var index: number = -999;
      for (let i = 0; i < this.allTasks.length; i++) {
        if (this.allTasks[i]._id === this.updateTask.value._id) {
          index = i;
        }
      }
      if (index !== -999) {
        this.allTasks.splice(index, 1);
      }
      this.dayTasks = this.allTasks.filter(task => task.type === 'dagtaak')
      this.normalTasks = this.allTasks.filter(task => task.type === 'normale taak')
      this.individualTasks = this.allTasks.filter(task => task.type === 'taak in taak')
    });
  }

  async FillInitialList() {
    for (var i = 0; i < this.task.tasks.length; i++) {
      var obj: Task = this.task.tasks[i];
      await this.addItem(obj);
    }
  }

  Delay() {
    return new Promise(resolve => setTimeout(resolve, 300));
  }

  async addItem(obj: any) {
    await this.Delay();
    this.taskService.GetTask(obj._id).subscribe(request => {
      this.initialList.push(request.data);
    });
  }

  UpdateTask() {
    this.updateTask.value.tasks = [];
    this.updateTask.value.symbol = this.b64;
    this.updateTask.value.public_template = !this.updateTask.value.private_template;
    this.submitted = true;
    this.updateTask.value.tasks = [];

    if (this.CheckTimes() && this.updateTask.valid) {
      for (let i = 0; i < this.initialList.length; i++) {
        let temp = { '_id': 'test', 'time': '00:00:00', 'position': 1 };
        temp._id = this.initialList[i]._id;
        temp.time = this.times[i];
        temp.position = i + 1;
        this.updateTask.value.tasks.push(temp);
      }
      this.times = [];
      console.log(this.updateTask.value)
      this.taskService.PutTask(this.updateTask.value).subscribe(request =>
        this.router.navigate(['/tasks']));
    } else {
      this.times = [];
      alert('Naam is een verplicht veld. Controlleer ook of al je deeltaken waar een tijd verplicht is, is ingevuld.')
    }
  }
  times: string[] = [];
  timeList: any[] = [];

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

  EmptyImg() {
    this.imageSrc = '';
    this.b64 = '';
  }
}
