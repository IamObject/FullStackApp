package com.social.recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
@Transactional
public interface IngredientRepository extends JpaRepository<Ingredient, Long> {
//	Page<Ingredient> findByRecipeId(Long id1, Pageable pageable);
//    Optional<Ingredient> findByIdAndRecipeId(Long id1, Long id);
	
}
							