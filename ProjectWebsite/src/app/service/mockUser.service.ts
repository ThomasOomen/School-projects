import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Request} from '../models/Request';

@Injectable({
  providedIn: 'root'
})
export class MockUserService {

  constructor(
    private readonly http: HttpClient
){}

//#region Get
public GetUsers(): Observable<any> {
  const tasks = { data:[
      { _id: '1', firstname: 'John', lastname: 'Doe', email: 'JohnDoe@mail.nl', password:'password123', users:['2'], facilities:['123'], role:'Zorgmedewerker', deleted:false },
      { _id: '2', firstname: 'Martha', lastname: 'Johnson', email: 'MarthaJohnson@mail.nl', password:'password321', users:['1'], facilities:['123'], role:'Client', deleted:false},
      { _id: '3', firstname: 'Jenn', lastname: 'Dean', email: 'JennDean@mail.nl', password:'password321', facilities:['123'], users:[], role:'Client', deleted:false}
  ]};
  return of(tasks);
}

GetUser(user_id: String): Observable<any> {
if(user_id == '1'){
  return of({data: { _id: '1', firstname: 'John', lastname: 'Doe', email: 'JohnDoe@mail.nl',facilities:['123'], users:['2'], role:'Zorgmedewerker', deleted:false}});
}
else if(user_id == '2'){
  return of({data: { _id: '2', firstname: 'Martha', lastname: 'Johnson', email: 'MarthaJohnson@mail.nl', password:'password321', users:['1'], facilities:['123'], role:'Client', deleted:false}});
}
else if(user_id == '3'){
  return of({data: { _id: '3', firstname: 'Jenn', lastname: 'Dean', email: 'JennDean@mail.nl', password:'password321', facilities:['123'], users:[], role:'Client', deleted:false}});
}
return of(null)
}

GetCurrentUser(): Observable<any> {
  const user = {data: { _id: '1', firstname: 'John', lastname: 'Doe', email: 'JohnDoe@mail.nl', users:['2'], facilities:['123'], role:'Zorgmedewerker', deleted:false}};
  return of(user);
  }

  GetRoleAndUserUsers(role: String, user_id: String): Observable<any> {
    const users = { data:[
      { _id: '2', firstname: 'Martha', lastname: 'Johnson', email: 'MarthaJohnson@mail.nl', password:'password321', users:['1'], facilities:['123'], role:'Client', deleted:false},
    ]};
  return of(users)
  }
//#endregion


//#region Delete
RemoveUser(user_id: String): Observable<any> {
  return of("clicked");
}
//#endregion
}
