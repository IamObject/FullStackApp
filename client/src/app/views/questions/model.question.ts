export class Question {
  id: string;
  question: string | null;
  author: string | null;
  createdBy: number;
  likes: number;
  dislikes: number;
  questionDescription: string | null;
  updatedBy: number;
  subjectId: number;
  isAdminApproved:boolean;

  constructor(question: string, author: string, likes: number, dislikes: number, questionDescription: string, subjectId: number) {
    this.question = question;
    this.author = author;
    this.likes = likes;
    this.dislikes = dislikes;
    this.questionDescription = questionDescription;
    this.subjectId = subjectId;
  }

}
