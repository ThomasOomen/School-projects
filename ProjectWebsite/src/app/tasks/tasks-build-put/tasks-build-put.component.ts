import { CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DurationhelperService } from 'src/app/helpers/durationhelper.service';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/service/task.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-tasks-build-put',
  templateUrl: './tasks-build-put.component.html',
  styleUrls: ['./tasks-build-put.component.scss']
})
export class TasksBuildPutComponent implements OnInit {
  @Input() updateTask: FormGroup = this.formBuilder.group({
    _id: new FormControl(''),
    name: new FormControl('',[Validators.required]),
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
  task: Task = new Task();
  currentTaskId: any;
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
  returnDrop(event: CdkDragDrop<any, String[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else{
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  onDrop(event: CdkDragDrop<any, String[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  deleteEntry(_id: String){
    if(this.initialList.some(e => e._id === _id)){
      this.initialList.splice(this.initialList.findIndex(e => e._id === _id), 1);
    }
  }
  //#endregion

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    this.loading = true;
    this.imageSrc = '';
    this.b64 = '';
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentTaskId = params.id
    });

    this.taskService.GetTask(this.currentTaskId).subscribe(request =>{
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
      this.loading = false;
    });
    this.FillAllTaskLists();
  }

  FillInitialList() {
    for (var i = 0; i < this.task.tasks.length; i++) {
      var obj: Task = this.task.tasks[i];
      this.taskService.GetTask(obj._id).subscribe(request =>{
        this.initialList.push(request.data);
      });
    }
  }

  SetImageSrc() {
    if(this.task.symbol){
      this.imageSrc = environment.urlAddress + this.task.symbol;
    }
  }

  FillAllTaskLists() {
    this.taskService.GetTasks().subscribe(request =>{
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

  UpdateTask() {
    this.updateTask.value.tasks = [];
    this.updateTask.value.symbol = this.b64;
    this.updateTask.value.public_template = !this.updateTask.value.private_template;
    this.submitted = true;
    let calculatedDuration = this.durationHelperService.CalculateDuration(this.initialList);
    this.updateTask.value.duration = calculatedDuration;

    if (this.updateTask.valid) {
      for (let i = 0; i < this.initialList.length; i++) {
        let temp = {'_id': 'test', 'time': '00:00:00', 'position': 1};
        temp._id = this.initialList[i]._id;
        temp.position = i + 1;
        this.updateTask.value.tasks.push(temp);
      } 
      this.taskService.PutTask(this.updateTask.value).subscribe(request => 
        this.router.navigate(['/tasks']));
    } else {
      alert('Naam is een verplicht veld. Controleer of je een naam hebt')
    }
  }

  onFileChange(event: any) {
    const reader = new FileReader();
     
    if(event.target.files && event.target.files.length) {
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
