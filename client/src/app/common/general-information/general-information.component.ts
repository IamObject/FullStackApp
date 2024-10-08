import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/login/auth.service';

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.scss']
})
export class GeneralInformationComponent implements OnInit {

  constructor(public authService : AuthService) { }
user:any;
  ngOnInit(): void {
this.user=this.authService.user
  }

}
