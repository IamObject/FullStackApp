import { RouterModule } from '@angular/router';
import { BodyComponent } from './body/body.component';
import { CommonModule } from "@angular/common";
import { CustomPaginationService } from "./pagination/services/custom-pagination.service";
import { NgModule } from "@angular/core";
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { OtherInformationComponent } from './other-information/other-information.component';
import { GeneralInformationComponent } from './general-information/general-information.component';
import { CommingsoonComponent } from './commingsoon/commingsoon.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HeaderComponent } from './header/header.component';
import { LeftmenuComponent } from './leftmenu/leftmenu.component';
import { AnimateComponent } from './animate/animate.component';
import { SelectApplicationComponent } from './select-application/select-application.component';

@NgModule({
    declarations: [    
    PaginationComponent,
    PagenotfoundComponent,
    BodyComponent,
    MyProfileComponent,
    OtherInformationComponent,
    GeneralInformationComponent,
    CommingsoonComponent,
    ContactusComponent,
    HeaderComponent,
    LeftmenuComponent,
    AnimateComponent,
    SelectApplicationComponent],
    imports: [
      CommonModule,RouterModule,ReactiveFormsModule
    ],
    providers: [ CustomPaginationService],
  })
  export class SharedModule { }
  