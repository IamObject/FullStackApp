export class Comment {
    id : any;
    comment: any="";
    comment_description: any="";
    likes: any="";
    dislikes: any="";
    createdBy: any="";
    updatedBy: any="";
    questionId:number;
    author:string | null ='';
    createdAt:Date;
    constructor(postComment: string, author: string | null, likes: number, dislikes: number, postDescription: string, questionId: number) {
        this.comment = postComment;
        this.author = author;
        this.likes = likes;
        this.dislikes = dislikes;
        this.comment_description = postDescription;
        this.questionId = questionId;
      }
      
  }
  