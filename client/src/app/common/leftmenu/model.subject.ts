export class Subject {
    id                : string ;
    subject           : string | null;
    author            : string ;
    createdBy         : number;
    likes             : number;
    dislikes          : number;
    subjectDescription: string | null;
    updatedBy         : number;
    createdAt        :number;
   
    constructor(subject: string,author: string,likes: number,dislikes: number,subjectDescription: string) {
     this.subject=subject;
     this.author=author;
     this.likes=likes;
     this.subjectDescription=subjectDescription;
    //  this.createdAt= Date.now();
  }
 
  }
  