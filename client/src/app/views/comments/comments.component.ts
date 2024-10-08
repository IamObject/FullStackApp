import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from './Comments.model';
import { CommentsService } from './comments.service'
import { Page } from '../../common/pagination/page';
import { AuthService } from '../../auth/login/auth.service';
import { CustomPaginationService } from '../../common/pagination/services/custom-pagination.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {

  constructor(private paginationService: CustomPaginationService, private authenticationService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private commentsService: CommentsService) { }
  @Input('parentid')
  parentid: number;
  @Input('posts')
  posts: Comment[];

  selector: string = ".search-results";
  user: any;
  addCommentsForm: FormGroup;
  questionId: string | null;
  formSubmitted: boolean = false;
  page: Page<Comment> = new Page();
  subjectId: any;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.questionId = params["parentid"];
      this.subjectId = params["subjectId"];
    });
    this.initialiseForm();
  }

  initialiseForm() {
    this.addCommentsForm = this.fb.group({
      comments: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getAllComments() {
    this.commentsService.getAllPostsByQuestions(this.page.pageable, this.parentid).subscribe(page => {
      this.page = page;
      this.posts = page["content"];
    });
  }

  addComments() {
    this.formSubmitted = true;
    if (this.addCommentsForm.invalid) {
      return
    }
    this.user = this.authenticationService.user;
    const comment = new Comment(
      this.addCommentsForm.controls.comments.value, this.user.fullName, 0, 0, 'description', this.parentid);
    this.commentsService.addPost(comment).subscribe((id) => {
      comment.id = id;
      this.posts.unshift(comment);
      this.addCommentsForm.reset();
      this.formSubmitted = false;
    });
  }

  clear() {
    this.addCommentsForm.reset();
  }

  deleteComment(id: string, i: number) {
    this.commentsService.deleteComment(id).subscribe((val) => {
      this.posts.splice(i, 1);
    });

  }
  likePostComments(id: string, i: number) {
    this.commentsService.likePostComments(id).subscribe((NewLikes) => {
      this.posts[i]["likes"] = NewLikes;
    });
  }

  disLikePostComments(id: string, i: number) {
    this.commentsService.disLikeComment(id).subscribe((NewDisLikes) => {
      this.posts[i]["dislikes"] = NewDisLikes;
    });
  }

  onScrollDown(e: any) {

  }
  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getAllComments();
  }

  public getPreviousPage(): void {

    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getAllComments();
  }

}
