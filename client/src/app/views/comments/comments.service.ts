import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from './../../config/app.config';
import { Comment } from './Comments.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../../common/pagination/page';
import { Pageable } from '../../common/pagination/pageable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(public http: HttpClient) {}
   
  addPost(post:Comment) {
    return this.http.post(AppConfig.commentUrl + "addComment", post);
  }

  likePostComments(postId: any) {
    return this.http.get(AppConfig.commentUrl + "likeCommentById/" + postId);
  }
  disLikeComment(postId: any) {
    return this.http.get(AppConfig.commentUrl + "dislikeCommentById/" + postId);
  }

  public getAllPostsByQuestions(pageable: Pageable,questionNo:number): Observable<Page<Comment>> {
    let url =AppConfig.commentUrl+'getAllCommentsByQuestionId/'+questionNo
    + '?page=' + pageable.pageNumber
    + '&size=' + pageable.pageSize
    + '&sort=id,DESC';
    return this.http.get<Page<Comment>>(url, httpOptions);
  }

  deleteComment(postId: any) {
    return this.http.delete(AppConfig.commentUrl + postId);
  }
}
