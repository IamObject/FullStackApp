package com.social.comment;


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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "comments")
@EntityListeners(AuditingEntityListener.class)
//Set ignoreUnknown to true and define the names of properties to ignore in the value element:
@JsonIgnoreProperties(value = {"createdAt", "updatedAt"}, 
        allowGetters = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Comment implements Serializable {

	 private static final long serialVersionUID = -566548849252110330L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="author")
    private String author;

    @Column(name="comment")
    private String comment;

    @Column(name="comment_description")
    private String comment_description;
    
    @Column(name="likes")
    private long likes;
    
    @Column(name="dislikes")
    private long dislikes;
    
    @Column(name="created_at",nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @CreatedDate
    private Date createdAt;

    @Column(name="updated_at", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;
    
    private long createdBy;
   
    private long updatedBy;
    
    @Column(name="question_id")
    private long questionId;

}