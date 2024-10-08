import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-application',
  templateUrl: './select-application.component.html',
  styleUrls: ['./select-application.component.scss']
})
export class SelectApplicationComponent {
  constructor(private Router: Router){

  }
  addQuestion() {
    this.Router.navigate(['/recipe']);
 }
}
