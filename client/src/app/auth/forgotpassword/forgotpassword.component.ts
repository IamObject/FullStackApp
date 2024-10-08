import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { User } from '../login/model.user';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  loginForm: FormGroup;
  formSubmitted: boolean = false;
  public user = new User();
  constructor(
    public router: Router,
    public authService: AuthService,
    private fb: FormBuilder
  ) {

  }

  initialiseForm() {

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],

    });
  }

  ngOnInit(): void {
    this.initialiseForm();
  }

  signup() {
    this.router.navigateByUrl("/signup");
  }

  login() {
    this.router.navigateByUrl("/login");
  }

  forgotpassword() {
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.forgotpassword(this.user);
    }
    return
  }

}
