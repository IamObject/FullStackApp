import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../../../common/leftmenu/subject.service';
import { LocalizationService } from '../../../common/localization/localization.service';
import { Page } from '../../../common/pagination/page';
import { CustomPaginationService } from '../../../common/pagination/services/custom-pagination.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {

  subjects = new Array<Recipe>();
  questions : any[];
  page: Page<Recipe> = new Page();
  closeResult = '';
  addQuestionsForm: FormGroup;
  subjectId: number;
  noRecordsFound:boolean=false;

  constructor(private route: ActivatedRoute,private paginationService: CustomPaginationService, public subjectService: SubjectService, public questionService: RecipeService, private router: Router,private localizationService:LocalizationService) { }
  localizationStr=this.localizationService.localizationStr;
  ngOnInit() {
    
    this.route.queryParams.subscribe(params => {
      this.subjectId = params["subjectId"];
      this.subjectId =5;
      this.noRecordsFound=false;
      if(this.subjectId!=null && this.subjectId!=undefined){
        this.getAllRecipe();
      }
     
    });
 
  }
 
  redirectTo(uri: string, subjectId: any) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri], { queryParams: { subjectId: subjectId } }));
  }
  addQuestion() {
     this.router.navigate(['/home/userhome/addQuestion'], { queryParams: { subjectId: this.subjectId } });
  }

  getAllRecipe() {
    this.questionService.getAllRecipe(this.page.pageable, this.subjectId).subscribe(page => {
      this.page = page;
      this.questions = page["content"];
      this.questionService.recipes=this.questions;
      if(this.questions.length == 0){
        this.noRecordsFound=true;
      }
    });
  }

  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getAllRecipe();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getAllRecipe();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getAllRecipe();
  }


  like(id:string){
    this.questionService.likeRecipe(id).subscribe(likes => {
      this.getAllRecipe();
    });
  }

  disLike(id:string){
    this.questionService.disLikeRecipe(id).subscribe(likes => {
      this.getAllRecipe();
    });
  }
  search(questionName :string){
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

  UpdateRecipe(id:number) {
    this.router.navigate(['/userdashboard/addRecipe'], { queryParams: { subjectId: this.subjectId, id: id } })
  }
}


