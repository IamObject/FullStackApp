

package com.social.question;

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
public interface QuestionRepository <P>extends JpaRepository<Question, Long>  {
	@Modifying
	@Query("update Question q set q.likes = q.likes+1 where q.id = :id")
	int likeQuestion(@Param("id") Long id);
	
	@Modifying
	@Query("update Question q set q.dislikes = q.dislikes+1 where q.id = :id")
	int dislikeQuestion(@Param("id") Long id);
	
	//@Modifying
	@Query("from Question q where q.subjectId = :subject_id")
	Page<Question> getQuestionsbysubjectId(@Param("subject_id") Long subject_id,Pageable pageable);
	
	@Query("select q.likes from  Question q  where q.id = :id ")
	long getLikes(@Param("id") Long id);
	
	@Query("select q.dislikes from  Question q  where q.id = :id ")
	long getDisLikes(@Param("id") Long id);
	@Modifying
	@Query("update Question q set q.isAdminApproved = true where q.id = :id")
	int approveQuestion(@Param("id") Long id);
}
//Pageable sortedByPriceDescNameAsc = 
//PageRequest.of(0, 5, Sort.by("price").descending().and(Sort.by("name")));
