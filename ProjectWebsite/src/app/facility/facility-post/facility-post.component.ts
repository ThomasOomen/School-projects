import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Facility } from 'src/app/models/Facility';
import { FacilityService } from 'src/app/service/facility.service';


@Component({
  selector: 'app-facility-post',
  templateUrl: './facility-post.component.html',
  styleUrls: ['./facility-post.component.scss']
})
export class FacilityPostComponent implements OnInit {
  
    @Input() createFacility: FormGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phonenumber: new FormControl('', [Validators.required, Validators.pattern(/(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/)]),
      zipcode: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i)]),
      housenumber: new FormControl('', [Validators.required])
    })
    
    sub: any;
    id: any;
    submitted = false;
    @Input() facility: Facility = new Facility;
    constructor(private route: ActivatedRoute, private readonly facilityService: FacilityService, private formBuilder: FormBuilder,  private router: Router) { }
    
    ngOnInit(): void {

  

    }
  
    CreateFacility() {
      this.submitted = true;
      if (this.createFacility.dirty && this.createFacility.valid) {
      this.facilityService.PostFacilities(this.createFacility.value).subscribe(request => 
        this.router.navigate(['/facility']));
      }
    }
  
  }
  