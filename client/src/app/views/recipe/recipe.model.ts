import { Ingredient } from './ingredient.model';

export class Recipe {
  public recipeId:number;
  public name: string;
  public description: string;
  public ingredients: Ingredient[];
  public subjectId: number;
  constructor(name: string, desc: string, ingredients: Ingredient[], subjectId: number) {
    this.name = name;
    this.description = desc;
    this.ingredients = ingredients;
    this.subjectId = subjectId;
  }

}
