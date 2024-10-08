import { ActivatedRoute,  Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../auth/login/auth.service';
import { Question } from '../model.question';
import { QuestionService } from '../question.service';
import { User } from '../../../auth/login/model.user';
import { LocalizationService } from '../../../common/localization/localization.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, public questionService: QuestionService,  private authenticationService: AuthService,private localizationService:LocalizationService) {

  }

  @Output() outputFromChild : EventEmitter<Question> = new EventEmitter();
  question1 : Question ;

  addQuestionForm: FormGroup;
  subjectId :number;
  submitted = false;
  currUse:string;
  question:Question;
  user:User;
  
localizationStr=this.localizationService.localizationStr;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.subjectId = params["subjectId"];
    });
    this.initialiseAddQuestionForm();
  }
  initialiseAddQuestionForm() {
    this.addQuestionForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      questionDescription: ['', [Validators.minLength(3), Validators.maxLength(100)]],
    });
  }

  addQuestion() {

    this.submitted = true;
    if (this.addQuestionForm.invalid) {
      return
    }
    this.currUse=localStorage.getItem('currentUser')  || '{}';
    this.user = JSON.parse(this.currUse);
    this.question = new Question(this.addQuestionForm.controls.question.value,this.authenticationService.user.firstName, 0, 0, this.addQuestionForm.controls.questionDescription.value, this.subjectId);
    this.questionService.addQuestion(this.question).subscribe((val) => {
      this.question1=this.question;
      this.outputFromChild.emit(this.question);
      // this.backToQuestions();
      this.clear()
    });
  }

  backToQuestions() {
    this.router.navigate(['../'], { relativeTo: this.route, queryParams: { subjectId: this.subjectId } });
  }

  clear(){
    this.addQuestionForm.reset();
   }
}
