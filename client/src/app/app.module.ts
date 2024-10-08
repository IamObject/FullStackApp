import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.component';
import { QuestionsComponent } from './views/questions/questions.component';
import { PostComponent } from './views/post/post.component';
import { HomeComponent } from './views/home/home.component';
import { QuestionService } from './views/questions/question.service';
import { CommentsComponent } from './views/comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddSubjectComponent } from './views/left-side-bar/add-subject/add-subject.component';
import { AddQuestionComponent } from './views/questions/add-question/add-question.component';
import { LocalizationService } from './common/localization/localization.service';
import { NgbToastModule } from  'ngb-toast';
import { RecipeService } from './views/recipe/recipe.service';
import { RecipeEditComponent } from './views/recipe/add-recipe/recipe-edit.component';
import { RecipeListComponent } from './views/recipe/recipe-list/recipe-list.component';
import { MyProfileComponent } from './common/my-profile/my-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ToastrModule } from 'ngx-toastr';

import { HttpErrorInterceptor } from './common/errorHandlers/http-error.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RolesDirective } from './common/directives/RolesDirective';
import { HeaderComponent } from './common/header/header.component';
import { LeftmenuComponent } from './common/leftmenu/leftmenu.component';
import { SelectApplicationComponent } from './common/select-application/select-application.component';
import { RecipeHomeComponent } from './views/recipe-home/recipe-home.component';
import { ForumHomeComponent } from './views/forum-home/forum-home.component';
import { Comments1Component } from './views/comments1/comments1.component';
// import { AnimateComponent } from './common/animate/animate.component';

@NgModule({
  declarations: [
    AppComponent,
    UserDashboardComponent,
    QuestionsComponent,
    PostComponent,
    HomeComponent,
    CommentsComponent,
    Comments1Component,
    AddSubjectComponent,
    AddQuestionComponent,
    RecipeEditComponent,
    RecipeListComponent,
    MyProfileComponent,
    // AnimateComponent,
    SelectApplicationComponent,
    RolesDirective ,HeaderComponent,LeftmenuComponent, RecipeHomeComponent, ForumHomeComponent, Comments1Component
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    InfiniteScrollModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule,    
    ToastrModule.forRoot({closeButton:true}), 
  ],
  providers: [QuestionService,LocalizationService,RecipeService,  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
