
package com.social.question;


import java.io.Serializable;
import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "question")
@EntityListeners(AuditingEntityListener.class)
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, 
        allowGetters = true)
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Question implements Serializable {
//	 name, length, nullable, updateable etc.
	 private static final long serialVersionUID = -566548849252110330L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="author")
    private String author;
    
    
    @Column(name="question")
    @NotBlank
    private String question;
    
    //@NotBlank
    @Column(name="question_description")
    private String questionDescription;
    
    @Column(name="likes")
    private long likes;
    
    @Column(name="dislikes")
    private long dislikes;
    
    @Column(name="created_at",nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

    @Column(name="updated_at",nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;
    
    private long createdBy;
   
    private long updatedBy;
    
  
    @Column(name="subject_id")
    private long subjectId;
    
    @Column(name="isAdminApproved")
    private boolean isAdminApproved = true;



	public Question(String question2) {
		this.question=question2;
	}

	

	static Question from(String question) {
        return new Question(question);
    }
    // Getters and Setters ... (Omitted for brevity)
}