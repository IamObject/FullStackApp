import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConfig } from './../../config/app.config';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './model.user';
import { BehaviorSubject, Observable } from 'rxjs';
import {  map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthService {

enableBgColorChange:boolean=false;
  returnUrl: any;
  user=new User();
  isAdmin:boolean=false;
  private loggedIn = new BehaviorSubject<boolean>(false); 
  isLoggedOut$:Observable<boolean>=this.loggedIn.pipe(map(isLoggedIn=>!isLoggedIn));
  
  ngOnInit() { }

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private http: HttpClient, private router: Router) {
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); 
  }
  

  public logIn(user1: User) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }).append('Accept','application/json'),
    };
    this.http.post(AppConfig.API_URL + "/authentication/login", { "email": user1.email, "password": user1.password },httpOptions).subscribe(response => {
      
      if (response) {
        this.user = JSON.parse(JSON.stringify(response));;
        localStorage.setItem('token', this.user.password);
        localStorage.setItem('isLoggedIn', "true");
        this.toastr.success("Welcome " + this.user.fullName);
        this.loggedIn.next(true);
        this.route.queryParams.subscribe(params => {
          this.returnUrl = params["returnUrl"];
        });

        this.user.authorities.forEach(item => {
          for (const [key, value] of Object.entries(item)) {
              console.log(key, value)
              if(value=="ADMIN"){
                  this.isAdmin=true;
              }
          }
      })


        if (this.returnUrl) {
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.router.navigateByUrl('/userdashboard');
        }
      }
      else {
        this.router.navigateByUrl('/login');
      }
    });

  }
  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');    
    this.user=new User();
    this.loggedIn.next(false);
    this.http.post(AppConfig.API_URL + "logout", {});
    this.router.navigateByUrl('/home');
    return
  }

  public forgotpassword(user: User) {
    var base64Credential: string = btoa(user.username + ':' + user.password);
    base64Credential = 'kkkc3VtaXQxOnN1bWl0OTk=';
    let var1: any;
    let headers = new HttpHeaders()

      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('authorization', 'Basic ' + base64Credential);


    return this.http.post(AppConfig.API_URL + "/account/forgotpassword?username=" + user.username, headers)
      .subscribe(
        (val) => {
          if (val) {
          //  this.user = val;
          }
        },
        error => {
          // this.showError(error.error.message);
        },
        () => {
        }
      );
  }

}
// private subject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
// users$: Observable<User> = this.subject.asObservable().pipe(filter(user => !!user));;
// /users$.subscribe(user => this.subject.next(user.id != undefined ? user : ANONYMOUS_USER));
// public get currentUserValue(): User {
//   return this.subject.value;
// }