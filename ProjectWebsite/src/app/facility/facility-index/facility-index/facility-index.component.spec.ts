import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FacilityService } from 'src/app/service/facility.service';
import { MockFacilityService } from 'src/app/service/mockFacility.service';
import { By } from '@angular/platform-browser';


import { FacilityIndexComponent } from './facility-index.component';

let mockFacilityService; 

describe('FacilityIndexComponent', () => {
  let component: FacilityIndexComponent;
  let fixture: ComponentFixture<FacilityIndexComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports:   [HttpClientModule], 
      declarations: [ FacilityIndexComponent ],
      providers: [FacilityService]
    })
    
  });

  beforeEach(() => {
    TestBed.overrideComponent(FacilityIndexComponent, {set: {providers: [{provide: FacilityService,  useClass: MockFacilityService}] }});
    fixture = TestBed.createComponent(FacilityIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    TestBed.compileComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show table of facilities', fakeAsync(() => {
    fixture.detectChanges();
      let tableRows = fixture.nativeElement.querySelectorAll('tr');
      expect(tableRows.length).toBe(3);
      let row1 = tableRows[1];   
      expect(row1.cells[0].innerHTML).toBe('Facility')
      let row2 = tableRows[2]; 
      expect(row2.cells[0].innerHTML).toBe('Facility2')
  }));

  it('should render Nieuwe taak button', fakeAsync(() => {
    const newTaskButton = fixture.debugElement.nativeElement.querySelector("#new-facility");
    expect(newTaskButton).toBeTruthy();
  }));

  it('check new-tasks routing', fakeAsync(() => {
    let href = fixture.debugElement.query(By.css('#new-facility')).nativeElement.getAttribute('href');
    expect(href).toEqual('/facility-create');
  }));
 
});
