import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from "@angular/common/http";
import { Task } from '../models/Task';
import { Observable } from 'rxjs/internal/Observable';
import { Request} from '../models/Request';
import { environment } from 'src/environments/environment';




@Injectable({
  providedIn: 'root'
})
export class TaskService {
  static GetTasks() {
    throw new Error('Method not implemented.');
  }


  constructor(
    private readonly http: HttpClient
){}

//#region Get
GetTasks(): Observable<Request> {
    return this.http.get<Request>(environment.urlAddress + `tasks`);
}

GetTask(task_id: any): Observable<Request> {
    return this.http.get<Request>(environment.urlAddress + `task/${task_id}`);
}
//#endregion

//#region Post

PostTasks(task: any): Observable<any> {
  return this.http.post<any>(environment.urlAddress + `tasks`, task);
}
//#endregion

//#region Put
PutTask(task: any): Observable<any> {
  // console.log(task);
  return this.http.put<Task>(environment.urlAddress + `task/${task._id}`, task);
}
//#endregion

//#region Delete
RemoveTask(task_id: String): Observable<any> {
  return this.http.delete(environment.urlAddress + `task/${task_id}`)
}
//#endregion

//#region Build
BindTask(task: Task): Observable<any> {
  return this.http.put(environment.urlAddress + `task/bindToTask/${task._id}`, task);
}
//#endregion
}