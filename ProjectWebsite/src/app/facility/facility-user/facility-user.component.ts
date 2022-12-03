import { Component, Input, OnInit, PipeTransform, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Facility } from 'src/app/models/Facility';
import { User } from 'src/app/models/User';
import { FacilityService } from 'src/app/service/facility.service';
import { UserService } from 'src/app/service/user.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-facility-user',
  templateUrl: './facility-user.component.html',
  styleUrls: ['./facility-user.component.scss'],
})
export class FacilityUserComponent implements OnInit {
  @Input() facilityUsers: User[] = [];
  @Input() options: User[] =  [];
  @Input() filter = new FormControl('');;
  @Input() filteredOptions: Observable<User[]> = new Observable;
  facility: Facility = new Facility;
  constructor(private readonly facilityService: FacilityService, private readonly userService: UserService,private route: ActivatedRoute) { 
  
  }
  sub: any;
  id: any;
  @Input() page = 1;
  @Input() pageSize = 4;
  @Input() collectionSize: number = 0; 
  dataSource = new MatTableDataSource(this.options);

  ngOnInit(): void {
    this.GetUsers()
   
  }
  displayedColumns: string[] = ['name', 'email', 'acties'];
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  GetUsers() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id
    });
    this.facilityUsers = [];
    this.facilityService.GetFacility(this.id).subscribe(request =>{
      this.facility = request.data;
      this.userService.GetUsers().subscribe(request2 =>{
        this.options = request2.data.filter((x: User)=> !request.data.users.includes(x._id))
        this.collectionSize = this.options.length
        this.dataSource = new MatTableDataSource(this.options);
      });
       this.facility.users.forEach(user =>{
        this.userService.GetUser(user).subscribe(request =>{
          if(request.data != null) {
            this.facilityUsers.push(request.data);
          }
         
         })
       }
    )}); 
  }
  

  AddUserToFacility(user: String){
      this.facility.user_id = [];
      this.facility.user_id.push(user)
      this.facilityService.PutUserToFacility(this.facility).subscribe(request => {
        this.GetUsers();
      });

  }

  RemoveUser(user: String) {
    this.facility.user_id = [];
    this.facility.user_id.push(user)
    this.facilityService.RemoveFacilityFromUser(this.facility).subscribe(request => {
      this.GetUsers();
    });
  }


}


