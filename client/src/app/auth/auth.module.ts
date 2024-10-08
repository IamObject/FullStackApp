import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './login/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AccountService } from './signup/account.service';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
        ForgotpasswordComponent,
    ],
    imports: [
        FormsModule,
        CommonModule  ,
        ReactiveFormsModule,
        HttpClientModule 
    ],
    providers: [AuthService,HttpClient,AccountService],
    bootstrap: [LoginComponent]
})
export class AuthModule { }