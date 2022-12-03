import { TestBed } from '@angular/core/testing';

import { DurationhelperService } from './durationhelper.service';

describe('DurationhelperService', () => {
  let service: DurationhelperService;
  let incorrectTimeObject = '';
  let correctTimeObject = {
    hour: 0,
    minute: 0,
    second: 0
  };
  let correctTimeObjectTime = {
    hour: 0,
    minute: 0,
    second: 30
  };

  let TasksListCorrect = [
    {
      "deleted": false,
      "_id": "609a4d57f8b1701e8c5a2806",
      "tasks": [],
      "name": "Opstaan",
      "description": "",
      "type": "normale taak",
      "private_template": true,
      "public_template": false,
      "user_id": "",
      "duration": "",
      "__v": 0
    },
    {
      "deleted": false,
      "_id": "609a4de8f8b1701e8c5a280f",
      "tasks": [],
      "name": "Rechtsonder",
      "description": "",
      "type": "taak in taak",
      "private_template": true,
      "public_template": false,
      "user_id": "",
      "duration": "00:00:00",
      "__v": 0
    },
    {
      "deleted": false,
      "_id": "609a4dd7f8b1701e8c5a280d",
      "tasks": [],
      "name": "Linksonder",
      "description": "",
      "type": "taak in taak",
      "private_template": true,
      "public_template": false,
      "user_id": "",
      "duration": "00:00:30",
      "__v": 0
    }
  ]

  let TasksListZeroDuration = [
    {
      "deleted": false,
      "_id": "609a4d57f8b1701e8c5a2806",
      "tasks": [],
      "name": "Opstaan",
      "description": "",
      "type": "normale taak",
      "private_template": true,
      "public_template": false,
      "user_id": "",
      "duration": "00:00:00",
      "__v": 0
    },
    {
      "deleted": false,
      "_id": "609a4de8f8b1701e8c5a280f",
      "tasks": [],
      "name": "Rechtsonder",
      "description": "",
      "type": "taak in taak",
      "private_template": true,
      "public_template": false,
      "user_id": "",
      "duration": "00:00:00",
      "__v": 0
    },
    {
      "deleted": false,
      "_id": "609a4dd7f8b1701e8c5a280d",
      "tasks": [],
      "name": "Linksonder",
      "description": "",
      "type": "taak in taak",
      "private_template": true,
      "public_template": false,
      "user_id": "",
      "duration": "00:00:00",
      "__v": 0
    }
  ]

  let TasksListEmptyDuration = [
    {
      "deleted": false,
      "_id": "609a4d57f8b1701e8c5a2806",
      "tasks": [],
      "name": "Opstaan",
      "description": "",
      "type": "normale taak",
      "private_template": true,
      "public_template": false,
      "user_id": "",
      "duration": "",
      "__v": 0
    },
    {
      "deleted": false,
      "_id": "609a4de8f8b1701e8c5a280f",
      "tasks": [],
      "name": "Rechtsonder",
      "description": "",
      "type": "taak in taak",
      "private_template": true,
      "public_template": false,
      "user_id": "",
      "duration": "",
      "__v": 0
    },
    {
      "deleted": false,
      "_id": "609a4dd7f8b1701e8c5a280d",
      "tasks": [],
      "name": "Linksonder",
      "description": "",
      "type": "taak in taak",
      "private_template": true,
      "public_template": false,
      "user_id": "",
      "duration": "",
      "__v": 0
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DurationhelperService);


  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('ZeroSecondsFilledIn False', () => {
    // incorrectTimeObject = '';
    expect(service.ZeroSecondsFilledIn(incorrectTimeObject)).toBeFalse();
  });

  it('ZeroSecondsFilledIn True', () => {
    // let correctTimeObject = { hour: 0, minute: 0,  second: 0 };
    expect(service.ZeroSecondsFilledIn(correctTimeObject)).toBeTrue();
  });

  it('ZeroSecondsFilledIn False', () => {
    // let correctTimeObject = { hour: 0, minute: 0,  second: 30 };
    expect(service.ZeroSecondsFilledIn(correctTimeObjectTime)).toBeFalse();
  });

  it('DurationIsNotEmptyString False', () => {
    // incorrectTimeObject = '';
    expect(service.DurationIsNotEmptyString(incorrectTimeObject)).toBeFalse();
  });

  it('DurationIsNotEmptyString True', () => {
    // let correctTimeObject = { hour: 0, minute: 0,  second: 0 };
    expect(service.DurationIsNotEmptyString(correctTimeObject)).toBeTrue();
  });

  it('DurationIsNotEmptyString True', () => {
    // let correctTimeObject ={ hour: 0, minute: 0,  second: 30 };
    expect(service.DurationIsNotEmptyString(correctTimeObjectTime)).toBeTrue();
  });

  it('GetDurationString false input', () => {
    // incorrectTimeObject = '';
    expect(service.GetDurationString(incorrectTimeObject)).toBeNull();
  });

  it('GetDurationString true empty time', () => {
    // let correctTimeObject ={ hour: 0, minute: 0,  second: 0 };
    expect(service.GetDurationString(correctTimeObject)).toEqual('00:00:00');
  });

  it('GetDurationString true filled time', () => {
    // let correctTimeObject ={ hour: 0, minute: 0,  second: 30 };
    expect(service.GetDurationString(correctTimeObjectTime)).toEqual('00:00:30');
  });

  it('CalculateDuration true input', () => {
    // incorrectTimeObject = '';
    expect(service.CalculateDuration(TasksListCorrect)).toEqual('00:00:30');
  });

  it('CalculateDuration true input', () => {
    // incorrectTimeObject = '';
    expect(service.CalculateDuration(TasksListZeroDuration)).toEqual('');
  });

  it('CalculateDuration false input', () => {
    // incorrectTimeObject = '';
    expect(service.CalculateDuration(TasksListEmptyDuration)).toEqual('');
  });

  it('toSeconds 0 seconds input', () => {
    expect(service.toSeconds("00:00:00")).toEqual(0);
  });

  it('toSeconds 30 seconde input', () => {
    expect(service.toSeconds("00:00:30")).toEqual(30);
  });

  it('toSeconds 5 minutes input', () => {
    expect(service.toSeconds("00:05:00")).toEqual(300);
  });

  it('toSeconds 1 hour input', () => {
    expect(service.toSeconds("01:00:00")).toEqual(3600);
  });

  it('toSeconds 15:03:43 hour input', () => {
    expect(service.toSeconds("15:03:43")).toEqual(54223);
  });


});

