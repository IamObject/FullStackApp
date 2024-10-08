import { ErrorHandler, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AppConfig } from './../../config/app.config';
import { Observable } from "rxjs/internal/Observable";
import { Page } from '../../common/pagination/page';
import { Pageable } from '../../common/pagination/pageable';
import { Subject } from './model.subject';


  
  
@Injectable({
  providedIn: 'root'
})
export class SubjectService extends ErrorHandler{

  firstSubjectId :string;
  constructor(public http: HttpClient) {     super();}
  

  
  addSubject(subject:Subject) {
    return this.http.post(AppConfig.subjectUrl + 'addsubject', subject);
  }

  likeSubject(subjectId: string) {
    return this.http.post(AppConfig.subjectUrl + 'likeSubjectById/' + subjectId, subjectId);
  }
  disLikeSubject(subjectId: string) {
    return this.http.post(AppConfig.subjectUrl + 'dislikeSubjectById/' + subjectId, subjectId);
  }

  public getAllSubjects(pageable: Pageable): Observable<Page<Subject>> {
    let url = AppConfig.subjectUrl+'allSubjects'
    + '?page=' + pageable.pageNumber
    + '&size=' + pageable.pageSize
    + '&sort=id,DESC';
    return this.http.get<Page<Subject>>(url);
  }

  public getAllRecipeTypes(pageable: Pageable): Observable<Page<Subject>> {
    let url = AppConfig.subjectUrl+'allRecipeTypes'
    + '?page=' + pageable.pageNumber
    + '&size=' + pageable.pageSize
    + '&sort=id,ASC';
    return this.http.get<Page<Subject>>(url);
  }
  
  searchSubject(pageable: Pageable,subjectname: any): Observable<Page<Subject>> {
    let url =  AppConfig.subjectUrl + 'searchsubject'
    + '?page=' + pageable.pageNumber
    + '&size=' + pageable.pageSize
    + '&sort=id'
    +'&id='+subjectname;
   return  this.http.get<Page<Subject>>(url)
  }
}

