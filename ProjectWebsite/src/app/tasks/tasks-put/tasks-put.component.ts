import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/Task';
import { TaskService } from 'src/app/service/task.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DurationhelperService } from 'src/app/helpers/durationhelper.service';

@Component({
  selector: 'app-tasks-put',
  templateUrl: './tasks-put.component.html',
  styleUrls: ['./tasks-put.component.scss']
})
export class TasksPutComponent implements OnInit {
  @Input() updateTask: FormGroup = this.formBuilder.group({
    _id: new FormControl(''),
    name: new FormControl('',[Validators.required]),
    description: new FormControl(''),
    symbolFile: new FormControl(''),
    type: new FormControl('', [Validators.required]),
    private_template: new FormControl(true, [Validators.required]),
    public_template: new FormControl(false),
    user_id: new FormControl(''),
    duration: new FormControl(''),
  });
  task: Task = new Task();
  currentTaskId: any;
  seconds: boolean;
  submitted: boolean;
  loading: boolean;
  imageSrc: string;
  b64: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly taskService: TaskService,
    private durationHelperService: DurationhelperService,
    ) {
      this.seconds = true;
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
          user_id: this.task?.user_id,
          duration: this.task?.duration,
        })
        this.SetImageSrc();
        this.loading = false;
      });
    }

    SetImageSrc() {
      if(this.task.symbol){
        this.imageSrc = environment.urlAddress + this.task.symbol;
      }
    }

    UpdateTask() {
      this.submitted = true;
      this.updateTask.value.symbol = this.b64;
      this.updateTask.value.public_template = !this.updateTask.value.private_template;
      this.updateTask.value.public_template = !this.updateTask.value.private_template;

      if (this.durationHelperService.DurationIsNotEmptyString(this.updateTask.value.duration),
        this.durationHelperService.ZeroSecondsFilledIn(this.updateTask.value.duration)) {
        this.updateTask.value.duration = '';
      } else if (this.durationHelperService.DurationIsNotEmptyString(this.updateTask.value.duration)) {
        let durationString = this.durationHelperService.GetDurationString(this.updateTask.value.duration);
        this.updateTask.value.duration = durationString;
      }

      if (this.updateTask.valid) {
        this.taskService.PutTask(this.updateTask.value).subscribe(request => 
          this.router.navigate(['/tasks']));
      } else {
        alert('Naam en tijd zijn verplichte velden. Controleer of je alle velden in tijd hebt ingevuld en een naam hebt')
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

    EmptyImg(){
      this.imageSrc = '';
      this.b64 = '';
    }
}
