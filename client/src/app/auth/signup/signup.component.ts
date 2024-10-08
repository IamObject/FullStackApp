import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountService } from './account.service';
import { Router } from '@angular/router';
import { User } from '../login/model.user';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector   : 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls  : ['./signup.component.scss'],
 
})
export class SignupComponent implements OnInit,AfterViewInit {

  constructor(public accountService: AccountService , public router     : Router,  private fb: FormBuilder,private toastr: ToastrService) { 
   }

  user = new User();
  signUpForm: FormGroup;
  formSubmitted:boolean=false;
  message:string="";
  fullName:string="";
  ngOnInit() { 
    this.initialiseForm() ; 
   
  }
  ngAfterViewInit(){
    this.user.username = "";
    this.user.password = "";
  }

  register() {
    this.formSubmitted=true;
    if(this.signUpForm.valid){
  
      this.user.username=this.user.email;
      this.user.authorities.push("USER");
      this.accountService.createAccount(this.user). subscribe(
        (data:any) => {
          this.message=data.body.localisedMessage;
          this.toastr.success("Registration completed");
          // return data;
        },
        (error) => {
          this.message = error.error.message
          this.toastr.error("Error while registration");
        });
    }
    
  }

  initialiseForm() {
    this.signUpForm = this.fb.group({
      email: ['email', [Validators.required, Validators.minLength(2), Validators.email]],
      password: ['password', [Validators.required, Validators.minLength(2)]],
      confirmPassword: ['confirmPassword', [Validators.required, Validators.minLength(2)]],
      fullName: ['fullName', [Validators.required, Validators.minLength(2)]]
     
    });
  }
  login() {
    this.router.navigateByUrl("/login");
  }
  fp() {
    this.router.navigateByUrl("/forgotpassword");
  }
}
