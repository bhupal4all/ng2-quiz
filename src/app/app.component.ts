import { Component } from '@angular/core';

import { QuizComponent } from './quiz/quiz.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  startQuiz:boolean =false;

  start = function() {
    this.startQuiz = true;
  };
}
