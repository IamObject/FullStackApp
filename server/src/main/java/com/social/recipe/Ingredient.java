package com.social.recipe;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ingredients")
public class Ingredient {

	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
//	@Column(name="id")
    private long ingredientId;
	
	//@Value("0")
	
	 @Column(name = "amount")
	private int amount;  
	 
	 @Column(name = "name")
	private String name;

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Ingredient(int amount, String name) {
		super();
		this.amount = amount;
		this.name = name;
	}

	public Ingredient() {
		super();
	}

//    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER,targetEntity=Recipe.class)
//    @JoinColumn(name = "recipe_Id")
//    @JsonIgnoreProperties("ingredients")
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_Id", referencedColumnName = "recipeId")
    @JsonIgnoreProperties("ingredientsList")
    private Recipe recipe;

	public long getIngredientId() {
		return ingredientId;
	}

	public void setIngredientId(long ingredientId) {
		this.ingredientId = ingredientId;
	}

	public Recipe getRecipe() {
		return recipe;
	}

	public void setRecipe(Recipe recipe) {
		this.recipe = recipe;
	}

	
//	    @ManyToOne(fetch = FetchType.LAZY, optional = false)
////	    @JoinColumn(name = "id", nullable = false)
//	    @OnDelete(action = OnDeleteAction.CASCADE)
//	    @JsonIgnore
//	    @JoinColumn(name = "id", referencedColumnName = "id", insertable = false, updatable = false)
//	    private Recipe recipe;

//		public Long getId() {
//			return id;
//		}
//
//		public void setId(Long id) {
//			this.id = id;
//		}

	
	    
	
}
