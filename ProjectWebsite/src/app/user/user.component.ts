import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../service/user.service';
import { Request } from 'src/app/models/Request';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() users: User[] = [];
  @Input() currentUser: User = new User;
  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    this.GetUsers();
    
  }

  GetUsers() {
    this.userService.GetUsers().subscribe(request =>{
      this.users = request.data;
    });
    this.userService.GetCurrentUser().subscribe(request =>{
      this.currentUser = request.data;
    });
  }

  GetClientUsers() {
    this.userService.GetRoleUsers("Client").subscribe(request =>{
      this.users = request.data;
    });
  }


  RemoveUser(_id: String) {
    this.userService.RemoveUser(_id).subscribe(request => 
      this.GetUsers());
    
  }
}
