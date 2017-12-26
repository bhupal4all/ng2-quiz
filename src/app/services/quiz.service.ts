import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Question } from "../models/question";

@Injectable()
export class QuizService {

  constructor(private http: Http) { }

  get(url: string) {
    return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  }

  getAll() {
    return [
      { id: 'data/aws.json', name: 'AWS' },
      { id: 'http://localhost:3000/aws', name: 'AWS Live' },
      { id: 'data/aspnet.json', name: 'aspnet' }
    ];
  }

  save(question: Question) {
    this.http.post('http://localhost:3000/questions', question).subscribe((response) => {
      let question = response.json();
      let qid = question.id;
      let ansCount: number = 0;

      question.options.forEach((element, index) => {
        element.questionId = qid;
        element.id = 10000 + (qid * 10) + index;
        if (element.isAnswer)
          ansCount++;
      });

      if (ansCount > 0) {
        if (ansCount === 1)
          question.questionTypeId = 1;
        else if (ansCount > 1)
          question.questionTypeId = 2;
      }

      this.http.put('http://localhost:3000/questions/'+qid, question).subscribe((response) => {
        console.log(response.json());
      });
    });

    return true;
  }

}
