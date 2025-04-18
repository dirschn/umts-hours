import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CalendarModule, CalendarEvent, CalendarView } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { setDay, startOfDay } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, CalendarModule, BrowserAnimationsModule, RouterOutlet]
})
export class AppComponent {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

  events: CalendarEvent[] = [
    {
      title: 'Sample Event',
      start: startOfDay(new Date()),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    }
  ];

  setView(view: CalendarView) {
    this.view = view;
  }
}
