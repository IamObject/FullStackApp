package com.social.recipe;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class RecipeService {
	@Autowired
	RecipeRepository recipeRepository;
	@Autowired
	IngredientRepository ingredientRepository;

//	@Transactional
	public Page<Recipe> findAllRecipes(Pageable pageable) {
		return (Page<Recipe>) recipeRepository.findAll(pageable);
	}


//	@Transactional
	public Optional<Recipe> findById(Long id) {

		Optional<Recipe> recipes = recipeRepository.findById(id);

		if (!recipes.isPresent()) {
			throw new RuntimeException("Recipe  with id "+ id +" Not Found");
		} else {
			return recipes;
		}

	}

//	@Transactional
	public void deleteByRecipeId(long id) {
		recipeRepository.deleteById(id);
	}

//	@Transactional
	public void deleteRecipe(long id) {
		recipeRepository.deleteById(id);
	}
	
//	@Transactional
	public boolean addRecipe(Recipe comment) {
		
		
		for (Ingredient iterable_element : comment.getIngredients()) {
			iterable_element.setRecipe(comment);
		}
	
		return recipeRepository.save(comment) != null;
	}

//	@Transactional
	public boolean updateRecipe(Recipe comment) {
		return recipeRepository.save(comment) != null;
	}
	
//	@Transactional
	public long likeRecipe(long id) {
		long likes=0;
		if(recipeRepository.likeRecipe(id)>=1) {
			likes=recipeRepository.getLikes(id);
		}
		return likes;
	}
	
//	@Transactional
	public long dislikeRecipe(long id) {
		long dislikes=0;
		if(recipeRepository.dislikeRecipe(id)>=1) {
			dislikes=recipeRepository.getDisLikes(id);
		}
		return dislikes;
	}
	
	public Page<Recipe>  getRecipeBybySubjectId(long subjectId,Pageable pageable) {
		
		return recipeRepository.getRecipeBybySubjectId(subjectId, pageable);
	}
	
	
}
