import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <!-- header --> 
  <app-header></app-header>

  <!-- routes --> 
  <router-outlet></router-outlet>  
  `
})
export class AppComponent {
  title = 'Project Everywere';
}
