import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable'

import { QuizService } from '../services/quiz.service';
import { HelperService } from '../services/helper.service';
import { Option, Question, Quiz, QuizConfig } from '../models/index';
import { FilterPipe } from '../filter/FilterPipe';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizes: any[];
  quiz: Quiz = new Quiz(null);
  mode = 'quiz';
  quizName: string;
  config: QuizConfig = {
    'allowBack': true,
    'allowReview': true,
    'autoMove': false,  // if true, it will move to next question automatically when answered.
    'duration': 0,  // indicates the time in which quiz needs to be completed. 0 means unlimited.
    'pageSize': 1,
    'requiredAll': false,  // indicates if you must answer all the questions before submitting.
    'richText': false,
    'shuffleQuestions': false,
    'shuffleOptions': false,
    'showClock': false,
    'showPager': true,
    'theme': 'none'
  };
  quizCount: number = 0;
  countDown;
  counter = 60;

  pager = {
    index: 0,
    size: 1,
    count: 1
  };

  constructor(private quizService: QuizService) {

  }

  ngOnInit() {
    this.quizes = this.quizService.getAll();
    this.quizName = this.quizes[0].id;
    this.loadQuiz(this.quizName);
  }

  loadQuiz(quizName: string) {
    this.quizService.get(quizName).subscribe(res => {
      this.quiz = new Quiz(res);
      this.pager.count = this.quiz.questions.length;
      this.config = this.quiz.config;

      if (this.config.shuffleQuestions) {
        var rand;
        var tmp;
        var len = this.pager.count;
        var ret = this.quiz.questions.slice();

        while (len) {
          rand = Math.floor(Math.random() * len--);
          tmp = ret[len];
          ret[len] = ret[rand];
          ret[rand] = tmp;
        }

        this.quiz.questions = ret;
      }
    });

    this.mode = 'quiz';
  }

  get filteredQuestions() {
    return (this.quiz.questions) ?
      this.quiz.questions.slice(this.pager.index, this.pager.index + this.pager.size) : [];
  }

  onSelect(question: Question, option: Option) {
    if (question.questionTypeId === 1) {
      question.options.forEach((x) => { if (x.id !== option.id) x.selected = false; });
    }

    if (this.config.autoMove) {
      this.goTo(this.pager.index + 1);
    }
  }

  goTo(index: number) {
    if (index >= 0 && index < this.pager.count) {
      this.pager.index = index;
      this.mode = 'quiz';
    }
  }

  isAnswered(question: Question) {
    return question.options.find(x => x.selected) ? 'Answered' : 'Not Answered';
  };

  isCorrect(question: Question) {
    return question.options.forEach(x => x.selected === x.isAnswer && console.log(x) ? 'correct' : 'wrong');

    /*let isCorrect = 'wrong';
  	
    question.options.forEach(op => { 
      if (op.selected) op.isAnswer ? isCorrect = 'correct' : isCorrect = 'wrong'; 
    });
    return isCorrect;
    */
  };

  onSubmit() {
    let answers = [];
    this.quiz.questions.forEach(x => answers.push({ 'quizId': this.quiz.id, 'questionId': x.id, 'answered': x.answered }));

    let noOfAnswers: number = 0;
    let noOfSelected: number = 0;
    this.quizCount = 0;
    this.quiz.questions.forEach(q => {

      noOfAnswers = 0;
      noOfSelected = 0;
      q.options.forEach(op => {
        if (op.isAnswer) {
          noOfAnswers++;

          if (op.selected)
            noOfSelected++;
        }
      });
      if (noOfAnswers === noOfSelected) {
        this.quizCount++;
      }
    });

    // Post your data to the server here. answers contains the questionId and the users' answer.
    console.log(this.quiz.questions);
    this.mode = 'result';
  }
}
