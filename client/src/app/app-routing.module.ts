import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './views/home/home.component';
import { AddSubjectComponent } from './views/left-side-bar/add-subject/add-subject.component';
import { AddQuestionComponent } from './views/questions/add-question/add-question.component';
import { QuestionsComponent } from './views/questions/questions.component';
import { UserDashboardComponent } from './views/user-dashboard/user-dashboard.component';
import { AuthGuard } from "./auth/login/AuthGuard";
import { Role } from './auth/login/role.model';
import { RecipeEditComponent } from './views/recipe/add-recipe/recipe-edit.component';
import { RecipeListComponent } from './views/recipe/recipe-list/recipe-list.component';
import { ForgotpasswordComponent } from './auth/forgotpassword/forgotpassword.component';
import { MyProfileComponent } from './common/my-profile/my-profile.component';
import { OtherInformationComponent } from './common/other-information/other-information.component';
import { GeneralInformationComponent } from './common/general-information/general-information.component';
import { CommingsoonComponent } from './common/commingsoon/commingsoon.component';
import { ContactusComponent } from './common/contactus/contactus.component';
import { state } from '@angular/animations';
import { RecipeHomeComponent } from './views/recipe-home/recipe-home.component';
import { SelectApplicationComponent } from './common/select-application/select-application.component';
const routes: Routes = [
  { path: '',   pathMatch: 'full',redirectTo: "selectapp" },
  {
    path     : "selectapp",
    component: SelectApplicationComponent
  },
  {
    path     : "login",
    component: LoginComponent,
    
  },
  {
    path     : "forgotpassword",
    component: ForgotpasswordComponent
  },
  {
    path     : "signup",
    component: SignupComponent
  },
 
  
  {
    path     : "myProfile",
    component: MyProfileComponent,
    children: [
      { path: '', redirectTo: 'genInfo', pathMatch: 'full' },
      {
        path: 'genInfo',
        component: GeneralInformationComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User,Role.Admin] }
        // runGuardsAndResolvers: 'always',
      },
      {
        path: 'othinfo',
        component: OtherInformationComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User,Role.Admin] }
        // runGuardsAndResolvers: 'always',
      },{
        path     : "resetPassword",
        component: ForgotpasswordComponent,
        data: { roles: [Role.User,Role.Admin] },
        canActivate: [AuthGuard],
      },
      {
        path     : "commingsoon",
        component: CommingsoonComponent,
        canActivate: [AuthGuard,],
      },
      {
        path     : "contactus",
        component: ContactusComponent,
        canActivate: [AuthGuard],
      },
    ]
  },


  {
    path     : "recipe",
    component: RecipeHomeComponent,
    children: [
      { path: '', redirectTo: 'recipelist', pathMatch: 'full' },
      {
        path: 'recipelist',
        component: RecipeListComponent,
        canActivate: [AuthGuard],
       data: { roles: [Role.User,Role.Admin] }
        // runGuardsAndResolvers: 'always',
      }
      
    ]
  },
  // {
  //   path     : "forum",
  //   component: MyProfileComponent,
  //   children: [
  //     { path: '', redirectTo: 'genInfo', pathMatch: 'recipe1' },
  //     {
  //       path: 'recipe1',
  //       component: RecipeHomeComponent,
  //       //canActivate: [AuthGuard],
  //     //  data: { roles: [Role.User,Role.Admin] }
  //       // runGuardsAndResolvers: 'always',
  //     }
      
  //   ]
  // },

  {
    path     : "userdashboard",
    component: UserDashboardComponent,
    children: [
      { path: '', redirectTo: 'questions', pathMatch: 'full' },
      {
        path: 'questions',
        component: QuestionsComponent,
       // canActivate: [AuthGuard],
        data: { roles: [Role.User,Role.Admin] }
        // runGuardsAndResolvers: 'always',
      },
      {
        path: 'addquestion',
        component: AddQuestionComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User,Role.Admin] }
        // runGuardsAndResolvers: 'always',
      },
      {
        path: 'addsubject',
        component: AddSubjectComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User,Role.Admin] }
        // runGuardsAndResolvers: 'always',

      },
      {
        path: 'addRecipe',
        component: RecipeEditComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User,Role.Admin] }
        // runGuardsAndResolvers: 'always',
      },
      {
        path: 'recipeList',
        component: RecipeListComponent,
        canActivate: [AuthGuard],
        data: { roles: [Role.User,Role.Admin] }
        // runGuardsAndResolvers: 'always',
      },
   ],
  },
  {
    path     : "home",
    component: HomeComponent
  },
  

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
