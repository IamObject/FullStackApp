import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth/login/auth.service';
import { LocalizationService } from './common/localization/localization.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  localizationStr: any;

  constructor(private localizationService: LocalizationService, public authService: AuthService) { }
  ngOnInit() {
    // this.localizationService.getLocalizationString();


  }

  //   @HostListener('click') 
  //   click(){
  //   //  alert('');
  //   if(!this.authService.enableBgColorChange)
  // {
  //   document.body.style.backgroundColor = this.getRandomColor();
  // }


  // getRandomColor() {
  //   var color = Math.floor(0x1000000 * Math.random()).toString(16);
  //   return '#' + ('000000' + color).slice(-6);
  // }
}
