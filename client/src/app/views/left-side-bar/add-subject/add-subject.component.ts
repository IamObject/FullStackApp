import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/login/auth.service';
import { User } from '../../../auth/login/model.user';
import { Subject } from '../../../common/leftmenu/model.subject';
import { SubjectService } from '../../../common/leftmenu/subject.service';


@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  constructor(private authenticationService: AuthService,public subjectService: SubjectService,private fb: FormBuilder,private router: Router,private route: ActivatedRoute) { }
  submitted = false;
  addSubjectForm: FormGroup;
  subject : Subject ;
  user : User;
  @Output() outputFromChild : EventEmitter<Subject> = new EventEmitter();
  subject1 : Subject ;

  ngOnInit(): void {
    this.initialiseAddSubjectForm()
  }

  initialiseAddSubjectForm() {
    this.addSubjectForm = this.fb.group({
      // Validators.pattern("^[A-Za-z_][A-Za-z\d_]*$")
      subjectName:['', [Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
      subjectDescription:['', [Validators.minLength(3),Validators.maxLength(50)]]
      
    });
  }
  addSubject() {
    this.submitted = true;
    if (this.addSubjectForm.invalid) {
      return
    }
    
    this.user= this.authenticationService.user;
     this.subject = new Subject(this.addSubjectForm.controls.subjectName.value, this.user.firstName, 0, 0, this.addSubjectForm.controls.subjectDescription.value );
    this.subjectService.addSubject(this.subject).subscribe((val) => {
      this.subject.id=String(val);
      this.subject1=this.subject;
      this.outputFromChild.emit(this.subject1);
      this.clear()
    });
  }

  clear(){
    this.addSubjectForm.reset();
   }
}
