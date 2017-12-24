import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { FilterPipe } from './filter/FilterPipe';
import { QuizEntryComponent } from './quiz-entry/quiz-entry.component';


@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    FilterPipe,
    QuizEntryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
