import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { Request} from '../models/Request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: User = new User()
  userRole = new BehaviorSubject(null)
  userRole$ = this.userRole.asObservable()

  constructor(
    private readonly http: HttpClient
){     
  if (localStorage.getItem('auth-token')) {
    this.GetCurrentUser().subscribe(request => {
      this.userRole.next(request.data.role)
    })
  }                                                                                                                                                            
}   

//#region Get
GetUsers(): Observable<Request> {
  return this.http.get<Request>(environment.urlAddress + `users`);
}

GetRoleUsers(role: String): Observable<Request> {
  return this.http.get<Request>(environment.urlAddress + `users/${role}`);
}

GetRoleAndUserUsers(role: String, user_id: String): Observable<Request> {
  return this.http.get<Request>(environment.urlAddress + `users/${role}/${user_id}`);
}

GetUser(user_id: String): Observable<Request> {
  return this.http.get<Request>(environment.urlAddress + `user/${user_id}`);
}

GetCurrentUser(): Observable<Request>  {
  var headers_object = new HttpHeaders().set("authtoken", "Bearer " + localStorage.getItem("auth-token"));
  return this.http.get<Request>(environment.urlAddress + `userfromtoken`,{headers: headers_object} );

}
//#endregion

//#region Post
PostUsers(user: User): Observable<User> {
return this.http.post<User>(environment.urlAddress + `users`, user);
}

Login(user: any): Observable<any> {
  return this.http.post<any>(environment.urlAddress + `login`, user, {observe: 'response'});
}
//#endregion

//#region Put
PutUser(user: any): Observable<User> {
// console.log(User);
return this.http.put<User>(environment.urlAddress + `user/${user._id}`, user);
}

PutUserToUser(user: any): Observable<User> {
  return this.http.put<User>(environment.urlAddress + `user/bindToUser/${user._id}`, user);
}

RemoveUserFromUser(user: any): Observable<any> {
  return this.http.put(environment.urlAddress + `user/unbindToUser/${user._id}`, user)
}
//#endregion

//#region Delete
RemoveUser(user_id: String): Observable<any> {
return this.http.delete(environment.urlAddress + `user/${user_id}`)
}
//#endregion
}
function tap(arg0: (res: any) => void): import("rxjs").OperatorFunction<User, User> {
  throw new Error('Function not implemented.');
}

