package com.social.recipe;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
@Transactional
public interface RecipeRepository extends JpaRepository<Recipe, Long> {

	@Modifying
	@Query("update Recipe c set c.likes = c.likes+1 where c.id = :id")
	int likeRecipe( @Param("id") long id);
	
	@Modifying
	@Query("update Recipe c set c.dislikes = c.dislikes+1 where c.id = :id")
	int dislikeRecipe(@Param("id") Long id);
	
//	@Query("from Recipe c where c.id = :id")
//	Page<Recipe> getCommentBybyQuestionId(@Param("id") Long id,Pageable pageable);
//	
	
	@Query("from Recipe c where c.subjectId = :id")
	Page<Recipe> getRecipeBybySubjectId(@Param("id") long id,Pageable pageable);
	
	@Query("select c.likes from  Recipe c  where c.id = :id ")
	long getLikes(@Param("id") Long id);
	
	@Query("select c.dislikes from  Recipe c  where c.id = :id ")
	long getDisLikes(@Param("id") Long id);
	
	 public Recipe findByRecipeId(int recipeId);
}
							