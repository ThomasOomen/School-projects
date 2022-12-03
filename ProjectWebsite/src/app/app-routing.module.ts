import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './tasks/tasks.component';
import { TasksPutComponent} from './tasks/tasks-put/tasks-put.component';
import {TasksNewComponent} from './tasks/tasks-new/tasks-new.component';
import { TasksBuildComponent } from './tasks/tasks-build/tasks-build.component';
import { TasksBuildPutComponent } from './tasks/tasks-build-put/tasks-build-put.component';
import { FacilityIndexComponent } from './facility/facility-index/facility-index/facility-index.component';
import { FacilityPutComponent } from './facility/facility-put/facility-put.component';
import { FacilityPostComponent } from './facility/facility-post/facility-post.component';
import { FacilityUserComponent } from './facility/facility-user/facility-user.component';
import { UserComponent } from './user/user.component';
import { UsersPutComponent } from './user/users-put/users-put.component';
import { UsersNewComponent } from './user/users-new/users-new.component';
import { DaytaskPostComponent } from './tasks/daytask-post/daytask-post.component';
import { DaytaskPutComponent } from './tasks/daytask-put/daytask-put.component';
import { UserTaskComponent } from './user/user-task/user-task.component';
import { UserUserComponent } from './user/user-user/user-user.component';
import { ClientIndexComponent } from './user/client-index/client-index.component';
import { RoleGuardService } from './service/role-guard.service';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder', 'Zorgmedewerker', 'Client']}
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder', 'Zorgmedewerker']}
  },
  {
    path: 'tasks-update/:id', 
    component: TasksPutComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder', 'Zorgmedewerker']}
  },
  {
    path: 'tasks-new', 
    component: TasksNewComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder', 'Zorgmedewerker']}
  },
  {
    path: 'tasks-build',
    component: TasksBuildComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder', 'Zorgmedewerker']}
  },
  {
    path: 'tasks-build-update/:id',
    component: TasksBuildPutComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder', 'Zorgmedewerker']}
  },
  {
    path: 'daytask-post',
    component: DaytaskPostComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder', 'Zorgmedewerker']}
  },
  {
    path: 'daytask-update/:id',
    component: DaytaskPutComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder', 'Zorgmedewerker']}
  },
  {
    path: 'facility',
    component: FacilityIndexComponent,   
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder']}
  },
  {
    path: 'facility-update/:id',
    component: FacilityPutComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder']}
  },
  {
    path: 'facility-create', 
    component: FacilityPostComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder']}
  },
  {
    path: 'facility-users/:id', 
    component: FacilityUserComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder']}
  },
  {
    path: 'client-index/:id',
    component: ClientIndexComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Zorgmedewerker']}
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder', 'Zorgmedewerker']}
  },
  {
    path: 'users-update/:id',
    component: UsersPutComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder']}
  },
  {
    path: 'users-new', 
    component: UsersNewComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder']}
  },
  {
    path: 'user-task/:id',
    component: UserTaskComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder', 'Zorgmedewerker']}
  },
  {
    path: 'user-user/:id',
    component: UserUserComponent,
    canActivate: [RoleGuardService],
    data: { roles: ['Beheerder', 'Zorgmedewerker']}
  },
  {
    path: 'login',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { 

}
