import { Component, OnInit } from '@angular/core';
import { LocalizationService } from '../../common/localization/localization.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private localizationService :LocalizationService) { }

  ngOnInit(): void {
  }
  //localizationStr=this.localizationService.localizationStr;
}
