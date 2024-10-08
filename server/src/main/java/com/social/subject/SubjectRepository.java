package com.social.subject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
@Transactional
public interface SubjectRepository<P>  extends JpaRepository<Subject, Long> {

	@Modifying
	@Query("update Subject s set s.subject = :subjectname where s.id = :id")
	int updateSubjectName(@Param("subjectname") String subject, @Param("id") Long id);
	
	
	@Modifying
	@Query(value="update Subject s set s.likes = s.likes+1 where s.id = :id")
	int  likeSubject(@Param("id") Long id);
	
	@Modifying   
	@Query("update Subject s set s.dislikes = s.dislikes+1 where s.id = :id ")
	int dislikeSubject(@Param("id") Long id);
	
	@Query("select s.likes from  Subject s  where s.id = :id ")
	long getLikes(@Param("id") Long id);
	
	@Query("select s.dislikes from  Subject s  where s.id = :id ")
	long getDisLikes(@Param("id") Long id);
	
	
//	List<Subject> findByFirstName(String firstName);
	
}
