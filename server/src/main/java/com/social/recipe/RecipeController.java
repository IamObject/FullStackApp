package com.social.recipe;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("recipe")
@CrossOrigin
public class RecipeController {

	@Autowired
	RecipeService recipeService;

	@PostMapping(value = "/addRecipe")
	public boolean createQuestion(@RequestBody Recipe question) {
		return recipeService.addRecipe(question);
	}

	@GetMapping("/{id}")
	public Optional<Recipe> getRecipesBySubjectId(@PathVariable(value = "id") Long subjectId) {

		return recipeService.findById(subjectId);

	}

	@PutMapping("/{id}")
	public boolean updateQuestion(@Valid @RequestBody Recipe question) {

		return recipeService.updateRecipe(question);
	}

	@DeleteMapping("/{id}")
	public void deleteQuestion(@PathVariable(value = "id") long questionId) {
				
		 recipeService.deleteRecipe(questionId);
	}

	@GetMapping("/likeRecipeById/{id}")
	public long likerecipe(@PathVariable(value = "id") long id) {
		return recipeService.likeRecipe(id);
	}

	@GetMapping("/dislikeRecipeById/{id}")
	public long dislikerecipe(@PathVariable(value = "id") long questionId) {
		return recipeService.dislikeRecipe(questionId);
	}

	@GetMapping("/getAllRecipesByQuestionId/{questionId}")
	public Page<Recipe> getRecipeBybyQuestionId(Pageable pageable,
			@PathVariable(value = "questionId") Long questionId) {

		return recipeService.getRecipeBybySubjectId(questionId, pageable);
	}
}
