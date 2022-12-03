import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse } from "@angular/common/http";
import { Facility } from '../models/Facility';
import { Observable } from 'rxjs/internal/Observable';
import { Request} from '../models/Request';
import { of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class MockFacilityService {

  constructor(
    private readonly http: HttpClient
){}
//#region Get
public GetFacilities(): Observable<any> {
  const facilities = { data:[
    { _id: '1', name: 'Facility', email: 'test@test.nl', phonenumber: '0612345678',users: [], zipcode:'1234AB', housenumber:'1' },
    { _id: '2', name: 'Facility2', email: 'test2@test.nl', phonenumber: '0687654321',users: [], zipcode:'4321AB', housenumber:'2'}
  ]};
   return of(facilities);
}
  GetFacility(facility_id: String): Observable<any> {
    const facility = {data: { _id: '123', name: 'Facility', email: 'test@test.nl',users: ['1'], phonenumber: '0612345678', zipcode:'1234AB', housenumber:'1' }};
    if(facility_id == facility.data._id){
      return of(facility);
    }
    return of(null)
  }
  
  // #endregion

// //#region Post
// PostFacilities(facility: any): Observable<Facility> {
//   return this.http.post<any>(`http://localhost:3001/Facilities`, facility);
// }

// //#endregion

// //#region Put
// PutFacility(facility: any): Observable<any> {
//     return this.http.put<any>(`http://localhost:3001/Facility/${facility._id}`, facility);
// }
// //#endregion

//#region Delete
RemoveFacility(facility_id: String): Observable<any> {
     return of("clicked");
}
//#endregion


}
