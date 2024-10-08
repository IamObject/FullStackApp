import { Component, OnInit } from '@angular/core';

import { SubjectService } from 'src/app/views/subject/subject.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {

  constructor(subjectService:SubjectService) 
  {

    
   }

  ngOnInit(): void {
  }

}
