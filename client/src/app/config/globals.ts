import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Globals {
    recipe: string = "recipe";
    comment: string = "comment";
    appName = this.comment;
}