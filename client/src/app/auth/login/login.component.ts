import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { User } from "./model.user";
import { AppConfig } from "../../config/app.config";


@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {

  ngOnInit() {

  }
  public user = new User();
  loginForm: FormGroup;
  formSubmitted: boolean = false;
  pwdw: any;
  ip: any;
  constructor(
    public router: Router,
    public authService: AuthService,
    private fb: FormBuilder) {
    this.initialiseForm();
  }


  login() {
    localStorage.getItem('token');
    this.formSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.logIn(this.user);
    }
    return
  }

  initialiseForm() {
    this.user.email = "test3@test.com";
    this.user.password = "test3";
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  showpassword() {

    this.pwdw = document.getElementById("password");

    if (this.pwdw.type === "password") {
      this.pwdw.type = "text";
    } else {
      this.pwdw.type = "password";
    }
  }
  configureip() {
    AppConfig.API_URL = 'http://' + this.ip + ':8080';
  }

  signup() {
    this.router.navigateByUrl("/signup");
  }
  fp() {
    this.router.navigateByUrl("/forgotpassword");
  }
}
