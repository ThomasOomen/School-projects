import { Component, Input, OnInit } from '@angular/core';
import { Facility } from 'src/app/models/Facility';
import { Request } from 'src/app/models/Request';
import { FacilityService } from 'src/app/service/facility.service';

@Component({
  selector: 'app-facility-index',
  templateUrl: './facility-index.component.html',
  styleUrls: ['./facility-index.component.scss']
})
export class FacilityIndexComponent implements OnInit {
  @Input() facilities: Facility[] = [];
  constructor(private readonly facilityService: FacilityService) { }

  ngOnInit(): void {
    this.GetFacilities()
  }

  GetFacilities() {
    this.facilityService.GetFacilities().subscribe(request =>{
      this.facilities = request.data;
    });
  }

  RemoveFacility(_id: String) {
    this.facilityService.RemoveFacility(_id).subscribe(request => {
      this.GetFacilities();
    });
  }
}
