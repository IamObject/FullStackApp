package com.social.comment;
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
public interface CommentRepository extends JpaRepository<Comment, Long> {

	@Modifying
	@Query("update Comment c set c.likes = c.likes+1 where c.id = :id")
	int likeComment( @Param("id") long id);
	
	@Modifying
	@Query("update Comment c set c.dislikes = c.dislikes+1 where c.id = :id")
	int dislikeComment(@Param("id") Long id);
	
	@Query("from Comment c where c.questionId = :id")
	Page<Comment> getCommentBybyQuestionId(@Param("id") long id,Pageable pageable);
	
	@Query("select c.likes from  Comment c  where c.id = :id ")
	long getLikes(@Param("id") Long id);
	
	@Query("select c.dislikes from  Comment c  where c.id = :id ")
	long getDisLikes(@Param("id") Long id);
	
	
}
							