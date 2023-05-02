import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import { CalendarComponent } from './calendar/calendar.component'; // a plugin
import { HttpClientModule } from "@angular/common/http";
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { DateTimePickerComponent } from './components/date-time-picker/date-time-picker.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {MatSnackBarModule} from '@angular/material/snack-bar';


/* Calendar.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin
]);  */


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DateTimePickerComponent
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    FullCalendarModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    SelectDropDownModule,
    FontAwesomeModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
