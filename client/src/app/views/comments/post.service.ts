
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AppConfig } from "../../config/app.config";

@Injectable()
export class PostService {
  constructor(public http: HttpClient) {}
  getAllPosts(pageno: any) {
    return this.http.get(AppConfig.postUrl + "posts/" + pageno);
  }
  addPost(post) {
    return this.http.post(AppConfig.postUrl + "addpost", post);
  }

  likePostComments(postId: any) {
    return this.http.post(AppConfig.postUrl + "post/like/" + postId,postId);
  }
  disLikeComment(postId: any) {
    return this.http.post(AppConfig.postUrl + "post/dislike/" + postId,postId);
  }
  getAllPostsByQuestions(questionNo: any) {
    return this.http.get(AppConfig.postUrl + "posts/" + questionNo);
  }
}
