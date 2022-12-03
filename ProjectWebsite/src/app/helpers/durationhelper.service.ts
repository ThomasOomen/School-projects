import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DurationhelperService {

  constructor() { }

  /* duration:any = {hour: 00, minute: 00, second: 00} */
  ZeroSecondsFilledIn(duration: any) {
    if (duration.hour === 0 && duration.minute === 0 && duration.second === 0) {
      return true
    } else {
      return false
    }
  }

  /* duration:any = {hour: 00, minute: 00, second: 00} of string */
  DurationIsNotEmptyString(duration: any) {
    if (typeof (duration) !== 'string') {
      return true;
    } else {
      return false;
    }
  }

  /* duration:any = {hour: 00, minute: 00, second: 00} */
  GetDurationString(duration: any) {
    if (duration !== '') {
      if ('hour' in duration && 'second' in duration && 'minute' in duration) {
        let hours = duration.hour;
        let minutes = duration.minute;
        let seconds = duration.second
        let durationString = this.TimePartToString(hours) + ':' + this.TimePartToString(minutes) + ':' + this.TimePartToString(seconds);
        return durationString;
      } else {
        return null
      }
    } else {
      return null;
    }
  }

  TimePartToString(d: number) {
    return (d < 10) ? '0' + d.toString() : d.toString();
  }

  CalculateDuration(list: any[]) {
    var totalSecondsnOfAllSubTasks = 0;
    for (var i = 0; i < list.length; i++) {
      if (list[i].duration !== '') {
        totalSecondsnOfAllSubTasks = Math.abs(totalSecondsnOfAllSubTasks + this.toSeconds(list[i].duration));
      }
    }
    var timeString = this.toTimeString(totalSecondsnOfAllSubTasks);
    if (timeString !== '00:00:00') {
      return timeString;
    } else {
      return '';
    }
  }

  toTimeString(seconds: any) {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
  }

  toSeconds(time_str: string) {
    // Extract hours, minutes and seconds
    var parts: any = time_str.split(':');
    // compute  and return total seconds
    return parts[0] * 3600 + // an hour has 3600 seconds
      parts[1] * 60 +   // a minute has 60 seconds
      +parts[2];        // seconds
  }
}