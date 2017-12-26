import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { FilterPipe } from './filter/FilterPipe';
import { QuizEntryComponent } from './quiz-entry/quiz-entry.component';

import { SimpleTimer } from 'ng2-simple-timer';
import { ClockTimerComponent } from './clock-timer/clock-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    FilterPipe,
    QuizEntryComponent,
    ClockTimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [SimpleTimer],
  bootstrap: [AppComponent]
})
export class AppModule { }
