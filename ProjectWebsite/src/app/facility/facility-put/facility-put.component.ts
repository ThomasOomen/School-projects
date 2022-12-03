import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Facility } from 'src/app/models/Facility';
import { FacilityService } from 'src/app/service/facility.service';
import { Request } from 'src/app/models/Request';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-facility-put',
  templateUrl: './facility-put.component.html',
  styleUrls: ['./facility-put.component.scss']
})
export class FacilityPutComponent implements OnInit {
  @Input() updateFacility: FormGroup =  this.formBuilder.group({
    _id: new FormControl(''),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phonenumber: new FormControl('', [Validators.required, Validators.pattern(/(^\+[0-9]{2}|^\+[0-9]{2}\(0\)|^\(\+[0-9]{2}\)\(0\)|^00[0-9]{2}|^0)([0-9]{9}$|[0-9\-\s]{10}$)/)]),
    zipcode: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-z]{2}$/i)]),
    housenumber: new FormControl('', [Validators.required])
  });
  sub: any;
  id: any;
  @Input() facility: Facility = new Facility;
  submitted = false;
  constructor(private route: ActivatedRoute, private readonly facilityService: FacilityService, private formBuilder: FormBuilder, private router: Router) { }
  
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id
    });
    this.facilityService.GetFacility(this.id).subscribe(request =>{
      this.facility = request.data;
      this.updateFacility.patchValue({
        _id: request.data._id,
        name: this.facility?.name,
        email: this.facility?.email,
        phonenumber: this.facility?.phonenumber,
        zipcode: this.facility?.zipcode,
        housenumber: this.facility?.housenumber,
      }) 
    });
    
  }

  UpdateFacility() {
    this.submitted = true;
    if (this.updateFacility.dirty && this.updateFacility.valid) {
    this.facilityService.PutFacility(this.updateFacility.value).subscribe(request => 
      this.router.navigate(['/facility']));
    }
  }

}
