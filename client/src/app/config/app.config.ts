import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
@Injectable()
export class AppConfig {

  static title = 'spring boot and angular 4 secure authentication';
//    static API_URL = "http://192.168.1.100:8081";
// static API_URL ="http://192.168.1.11:8080";
 static API_URL ="http://localhost:8081";
  //static API_URL ="http://110.227.217.247:8081";
  //static API_URL = "http://35.207.251.143:8080";
  static  questionsUrl = AppConfig.API_URL + '/question/';
  static recipeUrl = AppConfig.API_URL + '/recipe/';
  static subjectUrl = AppConfig.API_URL + '/subjects/'
  static postUrl = AppConfig.API_URL + '/post/'
  static commentUrl = AppConfig.API_URL + '/comment/'

  // static httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' ,'Accept' : 'application/json'})
  // };

}
//ng serve --host=0.0.0.0 --disable-host-check



