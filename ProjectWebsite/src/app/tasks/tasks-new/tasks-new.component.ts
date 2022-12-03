import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from 'src/app/service/task.service';
import { Router } from '@angular/router';
import { DurationhelperService } from 'src/app/helpers/durationhelper.service';

@Component({
  selector: 'app-tasks-new',
  templateUrl: './tasks-new.component.html',
  styleUrls: ['./tasks-new.component.scss']
})
export class TasksNewComponent implements OnInit {
  @Input() createTask: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    symbolFile: new FormControl(''),
    type: new FormControl('taak in taak'),
    private_template: new FormControl(true, [Validators.required]),
    public_template: new FormControl(false),
    user_id: new FormControl(''),
    duration: new FormControl(''),
  });
  seconds: boolean;
  submitted: Boolean;
  b64: string;
  imageSrc: string;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private readonly taskService: TaskService,
    private durationHelperService: DurationhelperService,
  ) {
    this.seconds = true;
    this.submitted = false;
    this.b64 = '';
    this.imageSrc = '';
  }

  ngOnInit(): void {
  }

  CreateTask() {
    this.submitted = true;
    this.createTask.value.symbol = this.b64;
    this.createTask.value.public_template = !this.createTask.value.private_template;

    if (this.durationHelperService.DurationIsNotEmptyString(this.createTask.value.duration),
      this.durationHelperService.ZeroSecondsFilledIn(this.createTask.value.duration)) {
      this.createTask.value.duration = '';
    } else if (this.durationHelperService.DurationIsNotEmptyString(this.createTask.value.duration)) {
      let durationString = this.durationHelperService.GetDurationString(this.createTask.value.duration);
      this.createTask.value.duration = durationString;
    }

    if (this.createTask.dirty && this.createTask.valid) {
      this.taskService.PostTasks(this.createTask.value).subscribe(request =>
      this.router.navigate(['/tasks']));
    } else {
      alert('Naam en tijd zijn verplichte velden. Controleer of je alle velden in tijd hebt ingevuld en een naam hebt')
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
