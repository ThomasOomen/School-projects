import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-client-index',
  templateUrl: './client-index.component.html',
  styleUrls: ['./client-index.component.scss']
})
export class ClientIndexComponent implements OnInit {
  @Input() users: User[] = [];
  sub: any;
  id: any;
  constructor(private readonly userService: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id
    });
      this.userService.GetRoleAndUserUsers("Client", this.id).subscribe(request =>{
        this.users = request.data;
      });
  }

}
