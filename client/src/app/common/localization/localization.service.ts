import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppConfig } from "../../config/app.config";
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }).append('Accept','application/json'),
  };
@Injectable()
export class LocalizationService{
    constructor(public http: HttpClient) { }
    localizationStr:any;
    public getLocalizationString() {
      let url = AppConfig.API_URL +'/localization/getLocalizationStringByLangCode/en';
       this.http.get(url,httpOptions).subscribe(page => {
        this.localizationStr=page;     
      });
         
    }
    
}