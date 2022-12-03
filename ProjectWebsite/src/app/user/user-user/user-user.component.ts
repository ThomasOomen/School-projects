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
  selector: 'app-user-user',
  templateUrl: './user-user.component.html',
  styleUrls: ['./user-user.component.scss']
})

export class UserUserComponent implements OnInit {
  @Input() userUsers: User[] = [];
  @Input() options: User[] =  [];
  @Input() filter = new FormControl('');;
  @Input() filteredOptions: Observable<User[]> = new Observable;
  user: User = new User;
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
    this.userUsers = [];
    this.userService.GetUser(this.id).subscribe(request =>{
      this.user = request.data;
      this.userService.GetUsers().subscribe(request2 =>{
        this.options = request2.data.filter((x: User)=> !request.data.users.includes(x._id))
        this.options = this.options.filter((x: User)=> x.role == "Client" && x.deleted == false)
        if(request.data.facilities.length === 0) {
          this.options = []
        }
      
        this.options.forEach((x: User) =>{
        if(x.facilities.length === 0) {
          this.options = this.options.filter((u: User) => u != x)
        }
        else {
          let hasSameFacility = false;
          x.facilities.forEach((f: String) => {
            if(request.data.facilities.includes(f)) {
              hasSameFacility = true
            }
          })
          if(!hasSameFacility) {
            this.options = this.options.filter((u: User) => u != x)
          }
        }})
        this.collectionSize = this.options.length
        this.dataSource = new MatTableDataSource(this.options);
      });
       this.user.users.forEach(user =>{
        this.userService.GetUser(user).subscribe(request =>{
          let hasSameFacility = false;
          this.user.facilities.forEach((f: String) => {
            if(request.data.facilities.includes(f)) {
              hasSameFacility = true
            }
           })
           if(hasSameFacility){
            this.userUsers.push(request.data);
          }       
          }) 
       }
    )
   
  }); 
  }
  

  AddUserToUser(user: String){
      this.user.user_id = [];
      this.user.user_id.push(user)
      this.userService.PutUserToUser(this.user).subscribe(request => {
        this.GetUsers();
      });

  }

  RemoveUser(user: String) {
    this.user.user_id = [];
    this.user.user_id.push(user)
    this.userService.RemoveUserFromUser(this.user).subscribe(request => {
      this.GetUsers();
    });
  }


}


