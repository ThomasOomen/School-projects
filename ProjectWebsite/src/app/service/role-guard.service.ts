import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of} from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { User } from '../models/User';
import { UserService } from './user.service';
import { Pipe, PipeTransform } from '@angular/core';
import { FileDetector } from 'selenium-webdriver';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {
  currentUser!: User;
  constructor(private userService: UserService) { 
  
  }

   
  ngOnInit(): void {
  
  }

  canActivate(route: ActivatedRouteSnapshot) {
    return this.userService.userRole$.pipe(
      filter(member => !!member),  // Filter NULL value here before sending object further
          map(member => {
            if(route.data.roles.includes(member)) {
              return true
            }
            return false
  
        }
      ))
    
  }
}
