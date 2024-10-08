import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Recipe } from './recipe.model';
import { AppConfig } from '../../config/app.config';
import { Pageable } from '../../common/pagination/pageable';
import { Page } from '../../common/pagination/page';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  public recipes: Recipe[] = [];
  constructor(public http: HttpClient) {
  }

  addRecipe(question: Recipe | null) {
    return this.http.post(AppConfig.recipeUrl + 'addRecipe', question);

  }
  likeRecipe(questionId: string) {
    return this.http.get(AppConfig.recipeUrl + 'likeRecipeById/' + questionId);

  }
  disLikeRecipe(questionId: any) {
    return this.http.get(AppConfig.recipeUrl + 'dislikeRecipeById/' + questionId);
  }

  public getAllRecipe(pageable: Pageable, subjectid: number): Observable<Page<Recipe>> {
    let url = AppConfig.recipeUrl + 'getAllRecipesByQuestionId/' + subjectid
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + '&sort=id,DESC';
    return this.http.get<Page<Recipe>>(url);
  }

  searchQuestion(pageable: Pageable, questionname: any): Observable<Page<Recipe>> {
    let url = AppConfig.recipeUrl + 'searchquestion'
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + '&sort=id'
      + '&id=' + questionname;
    return this.http.get<Page<Recipe>>(url)
  }

  
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

}
