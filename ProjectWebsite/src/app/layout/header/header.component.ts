import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private readonly userService: UserService) { }

  CurrentUser: User | undefined;


  ngOnInit(): void {
    this.reload()
      
  }
  
  reload(){
      this.userService.GetCurrentUser().subscribe((request: { data: User | undefined; }) => {
        this.CurrentUser =  request.data
      })
  }
  
  logout(){
    localStorage.clear();
  }


}

