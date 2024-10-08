import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/login/auth.service';
import { Question } from '../../views/questions/model.question';
import { QuestionService } from '../../views/questions/question.service';
import { LocalizationService } from '../localization/localization.service';
import { Page } from '../pagination/page';
import { CustomPaginationService } from '../pagination/services/custom-pagination.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  username:string;
  role:any;
  questions : any[];
  page: Page<Question> = new Page();
  noRecordsFound:boolean=false;
  isLoggedIn$: Observable<boolean>;  
  isLoggedOut$: Observable<boolean>;    
  constructor(public authService:AuthService,public questionService: QuestionService,private paginationService: CustomPaginationService){}
    ngOnInit(){
      this.isLoggedIn$ = this.authService.isLoggedIn;
      this.isLoggedOut$ = this.authService.isLoggedOut$;
       this.role=this.authService.user.authorities;
    }
    logout(){      
      this.authService.logOut();
    }


    // changeBGColor(){
    //   this.authService.enableBgColorChange=!this.authService.enableBgColorChange;
    // }

    toggleMenu() {

      var element = document.getElementById('sidebar');
      var screenHeight = window.innerWidth;
  
      if (element != null && element != undefined) {
  
        if (element.style.display == "") {
          if (screenHeight < 700) {
            element.style.display = "block";
            element.style.left = '0px';
          } else {
            element.style.display = "none";
          }
        } else {
          if (element.style.display == "none") {
            element.style.display = "block";
            element.style.left = '0px';
          }
          else {
            element.style.display = "none";
  
          }
        }
  
  
  
      }
    }
  
  
    toggleMenu2() {
      var body = document.getElementById('body');
      if (body != null && body != undefined) {
        body.classList.toggle('toggle-sidebar');
      }
    }
    searchQuestion(event: any){
      this.page.pageable = this.paginationService.getPageInNewSize(this.page, 10);
      this.questionService.searchQuestion( this.page.pageable,event.target.value)
      .subscribe(page => {
        this.page = page;
        this.questions = page["content"];
       if(this.questions.length == 0){
         this.noRecordsFound=true;
       }
        
      });
    }
}
