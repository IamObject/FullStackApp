import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from '@angular/forms';
import { CustomPaginationService } from '../../common/pagination/services/custom-pagination.service';
import { Page } from '../../common/pagination/page';
import { Question } from "./model.question";
import { QuestionService } from "./question.service";

import { LocalizationService } from '../../common/localization/localization.service';
import { CommentsService } from '../comments/comments.service';
import { Comment } from '../comments/Comments.model';
import { SubjectService } from '../../common/leftmenu/subject.service';
import { Subject } from '../../common/leftmenu/model.subject';
import { AuthGuard } from 'src/app/auth/login/AuthGuard';
import { AuthService } from 'src/app/auth/login/auth.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
 
  subjects = new Array<Subject>();
  questions : any[];
  page: Page<Question> = new Page();
  closeResult = '';
  addQuestionsForm: FormGroup;
  subjectId: number;
  noRecordsFound:boolean=false;
  pageC: Page<Comment> = new Page();
  posts :Comment [];
  pagecomments: Page<Comment> = new Page();
  
  constructor(public authGuard:AuthService, private commentsService : CommentsService, private route: ActivatedRoute,private paginationService: CustomPaginationService, private subjectService: SubjectService, private questionService: QuestionService, private router: Router,private localizationService:LocalizationService) { }
  localizationStr=this.localizationService.localizationStr;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.subjectId = params["subjectId"];
      this.noRecordsFound=false;
      if(this.subjectId){
        this.getAllQuestions();
      }
    });
 
  }

  getAllComments(id:any) {
    this.commentsService.getAllPostsByQuestions(this.page.pageable, id).subscribe(page => {
      this.posts = page["content"];
    });
  }
  redirectTo(uri: string, subjectId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri], { queryParams: { subjectId: subjectId } }));
  }
  addQuestion() {
     this.router.navigate(['/home/userhome/addQuestion'], { queryParams: { subjectId: this.subjectId } });
  }
  approve(id){//####
    this.questionService.approveQuestion(id).subscribe(response=>{

    })

  }
  getAllQuestions() {
    if(this.subjectId){
    this.questionService.getAllQuestions(this.page.pageable, this.subjectId).subscribe(page => {
      this.page = page;
      this.questions = page["content"];
      if(this.questions.length == 0){
        this.noRecordsFound=true;
      }
    });
  }
  }

  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getAllQuestions();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getAllQuestions();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getAllQuestions();
  }


  likeQuestion(id:string,i:number){
    this.questionService.likeQuestion(id).subscribe(NewLikes => {
      this.questions[i]["likes"]=NewLikes;
     
    });
  }

  disLikeQuestion(id:string,i:number){
    this.questionService.disLikeQuestion(id).subscribe(NewDisLikes => {
      this.questions[i]["dislikes"]=NewDisLikes;
    });
  }
  searchQuestion(questionName :string){
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, 10);
    this.questionService.searchQuestion( this.page.pageable,questionName,)
    .subscribe(page => {
      this.page = page;
      this.questions = page["content"];
     if(this.questions.length == 0){
       this.noRecordsFound=true;
     }
    });
  }

  getNewlyAddedQuestion(question:any){
  
    this.questions.unshift(question);
     this.router.navigate(['/userdashboard/questions'], { queryParams: { subjectId: this.subjectId } })
    }
}

