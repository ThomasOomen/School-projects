import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly userService: UserService) { }
  
  @Input() currentUser: User | undefined;

  ngOnInit(): void {
    this.userService.GetCurrentUser().subscribe((request: { data: User | undefined; }) => {
      this.currentUser =  request.data
    })
  }

}
