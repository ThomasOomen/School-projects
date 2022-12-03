import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { MainComponent } from './layout/main/main.component';
import { HeaderComponent } from './layout/header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksPutComponent } from './tasks/tasks-put/tasks-put.component';
import { TasksNewComponent } from './tasks/tasks-new/tasks-new.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TasksBuildComponent } from './tasks/tasks-build/tasks-build.component';
import { TasksBuildMaterials } from './tasks/tasks-build/tasks-build.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FacilityIndexComponent } from './facility/facility-index/facility-index/facility-index.component';
import { FacilityPutComponent} from './facility/facility-put/facility-put.component';
import { FacilityPostComponent } from './facility/facility-post/facility-post.component';
import { UserComponent } from './user/user.component';
import { UsersNewComponent } from './user/users-new/users-new.component';
import { UsersPutComponent } from './user/users-put/users-put.component';
import { FacilityUserComponent } from './facility/facility-user/facility-user.component';
import { TasksBuildPutComponent } from './tasks/tasks-build-put/tasks-build-put.component';
import { DaytaskPostComponent } from './tasks/daytask-post/daytask-post.component';
import { DaytaskPutComponent } from './tasks/daytask-put/daytask-put.component';
import { UserTaskComponent } from './user/user-task/user-task.component';
import { UserUserComponent } from './user/user-user/user-user.component';
import { ClientIndexComponent } from './user/client-index/client-index.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FacilityIndexComponent,
    FacilityPutComponent,
    FacilityPostComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    TasksComponent,
    TasksPutComponent,
    TasksNewComponent,
    UserComponent,
    UsersNewComponent,
    UsersPutComponent,
    FacilityUserComponent,
    TasksBuildComponent,
    TasksBuildPutComponent,
    DaytaskPostComponent,
    DaytaskPutComponent,
    UserTaskComponent,
    UserUserComponent,
    ClientIndexComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTableModule,
    NgbModule,
    TasksBuildMaterials,
  ],
  exports:[
    HeaderComponent,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
