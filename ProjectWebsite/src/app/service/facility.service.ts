import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from "@angular/common/http";
import { Facility } from '../models/Facility';
import { Observable } from 'rxjs/internal/Observable';
import { Request} from '../models/Request';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class FacilityService {
  static GetFacilities() {
    throw new Error('Method not implemented.');
  }

  
  constructor(
    private readonly http: HttpClient
){}

//#region Get
GetFacilities(): Observable<Request> {
  return this.http.get<Request>(environment.urlAddress + `Facilities`);
}
GetFacility(facility_id: String): Observable<Request> {
  return this.http.get<Request>(environment.urlAddress + `Facility/${facility_id}`)
}
//#endregion

//#region Post
PostFacilities(facility: any): Observable<Facility> {
  return this.http.post<any>(environment.urlAddress + `Facilities`, facility);
}

//#endregion

//#region Put
PutFacility(facility: any): Observable<any> {
    return this.http.put<any>(environment.urlAddress + `Facility/${facility._id}`, facility);
}

PutUserToFacility(facilty: any): Observable<Facility> {
  return this.http.put<Facility>(environment.urlAddress + `Facility/bindToUser/${facilty._id}`, facilty);
}

RemoveFacilityFromUser(facilty: any): Observable<any> {
  return this.http.put(environment.urlAddress + `Facility/unbindToUser/${facilty._id}`, facilty)
}
//#endregion

//#region Delete
RemoveFacility(facility_id: String): Observable<any> {
    return this.http.delete(environment.urlAddress + `Facility/${facility_id}`)
}


//#endregion


}
