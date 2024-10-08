import { Component, OnInit } from '@angular/core';
import { CustomPaginationService } from '../../common/pagination/services/custom-pagination.service';
import { Page } from '../../common/pagination/page';
import { Router } from "@angular/router";
import { Subject } from './model.subject';
import { SubjectService } from './subject.service';
import { LocalizationService } from '../../common/localization/localization.service';
import { AuthService } from '../../auth/login/auth.service';

import { Globals } from '../../config/globals';

@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.scss']
})
export class LeftmenuComponent implements OnInit {

  subjects = new Array<Subject>();
  page: Page<Subject> = new Page();
  subjectId: number;
  localizationStr: any;
  public sidebarShow: boolean = false;
  ngOnInit(): void {
    this.getAllSubject()
  }
  
  constructor(public globals: Globals, public localizationService: LocalizationService, private paginationService: CustomPaginationService,
    public subjectService: SubjectService, private router: Router, public authService: AuthService) {
      this.localizationStr=this.localizationService.localizationStr;
     }

  private getAllSubject(): void {
    this.subjectService.getAllSubjects(this.page.pageable)
      .subscribe(page => {
        this.page = page;
        this.subjects = page["content"];
        if (this.subjects[0] != null && this.subjects[0] != undefined) {
          this.subjectService.firstSubjectId = this.subjects[0].id;
         
          if (this.globals.appName == this.globals.recipe) {
            this.getListOf('/userdashboard/recipeList', this.subjectService.firstSubjectId);
          } else   if (this.globals.appName == this.globals.comment) {
            this.getListOf('/userdashboard/questions', this.subjectService.firstSubjectId);
          }
        }
      });
  }

  html = '<span><i>Tooltip</i> <u>with</u> <b>HTML</b></span>';
  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getAllSubject();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getAllSubject();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getAllSubject();
  }


  searchSubject(event: any) {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, 20);
    this.subjectService.searchSubject(this.page.pageable, event.target.value)
      .subscribe(page => {
        this.page = page;
        this.subjects = page["content"];
      });
  }

  getListOf(uri: string, subjectId: any) {
    // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
    this.subjectId = subjectId;
    this.router.navigate([uri], { queryParams: { subjectId: subjectId } })
    if (this.globals.appName === this.globals.recipe) {
      this.router.navigate(['/userdashboard/recipeList'], { queryParams: { subjectId: this.subjectId } })
    } else if (this.globals.appName === this.globals.comment) {
      this.router.navigate(['/userdashboard/questions'], { queryParams: { subjectId: this.subjectId } })
    } else {
    }
  }

  getNewlyAddedSubject(subject:any){
  
    this.subjects.unshift(subject);
    }

}
