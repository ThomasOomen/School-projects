import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MockTaskService {
    constructor (
        private readonly http: HttpClient
    ){}

    //#region Get
    public GetTasks(): Observable<any> {
        const tasks = { data:[
            { _id: '1', name: 'Task', description: '', symbol: '', type:'taak in taak', user_id: '', durartion: '00:00:30', tasks: [], public_template:false, private_template:false, deleted:false },
            { _id: '2', name: 'Task2', description: '', symbol: '', type:'taak in taak', user_id: '', durartion: '00:00:30', tasks: [], public_template:false, private_template:false, deleted:false }
        ]};
        return of(tasks);
    }
    GetTask(task_id: String): Observable<any> {
      const task = {data: { _id: '123', name: 'Task', description: '', symbol: '', type:'taak in taak', user_id: '', durartion: '00:00:30', tasks: [], public_template:false, private_template:false, deleted:false }};
      if(task_id == task.data._id){
        return of(task);
      }
      return of(null)
    }

// #endregion
//  #region Post
//  PostFacilities(facility: any): Observable<Facility> {
//   return this.http.post<any>(`http://localhost:3001/Facilities`, facility);
//  }
// #endregion

// #region Put
// PutFacility(facility: any): Observable<any> {
//     return this.http.put<any>(`http://localhost:3001/Facility/${facility._id}`, facility);
// }
// #endregion

    // #region Delete
    RemoveTask(task_id: String): Observable<any> {
        return of("clicked");
    }
    //#endregion
}