import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppConfig } from '../../config/app.config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../../common/pagination/page';
import { Pageable } from '../../common/pagination/pageable';
import { Question } from './model.question';



@Injectable()
export class QuestionService {
  
  constructor(public http: HttpClient) {
  }

  addQuestion(question:Question | null) {
    return this.http.post(AppConfig.questionsUrl + 'addquestion', question);

  }
  likeQuestion(questionId: string) {
    return this.http.get(AppConfig.questionsUrl + 'likeQuestionById/' + questionId);

  }

  approveQuestion(questionId: any) {
    return this.http.get(AppConfig.questionsUrl + 'approveQuestion/' + questionId);

  }
  disLikeQuestion(questionId: any) {  
    return this.http.get(AppConfig.questionsUrl + 'dislikeQuestionById/' + questionId);

  }
  
  public getAllQuestions(pageable: Pageable,subjectid:number): Observable<Page<Question>> {
    let url = AppConfig.questionsUrl+'getAllQuestions/'+subjectid
    + '?page=' + pageable.pageNumber
    + '&size=' + pageable.pageSize
    + '&sort=id,DESC';
    return this.http.get<Page<Question>>(url);
  }

  searchQuestion(pageable: Pageable,questionname: any): Observable<Page<Question>> {
    let url =  AppConfig.questionsUrl + 'searchquestion'
    + '?page=' + pageable.pageNumber
    + '&size=' + pageable.pageSize
    + '&sort=id'
    +'&id='+questionname;
   return  this.http.get<Page<Question>>(url)

  }
}

