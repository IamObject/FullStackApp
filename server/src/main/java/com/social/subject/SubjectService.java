package com.social.subject;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SubjectService {
	@Autowired
	SubjectRepository<Subject> subjectRepository;

//	@Transactional
	public Page<Subject> findAllSubjects(Pageable pageable) {
		return (Page<Subject>) subjectRepository.findAll(pageable);
	}

//	@Transactional
//	public List<Subject> findByFirstName(String name) {
//		return subjectRepository.findByFirstName(name);
//	}

//	@Transactional
	public Optional<Subject> findById(Long id) {

		Optional<Subject> Subjects = subjectRepository.findById(id);

		if (!Subjects.isPresent()) {
			throw new RuntimeException("Subject  with id "+ id +" Not Found");
		} else {
			return Subjects;
		}

	}

//	@Transactional
	public void deleteBySubjectId(long subjectId) {
		 subjectRepository.deleteById(subjectId);
	}

//	@Transactional
	public void deleteSubject(Subject subjectId) {
		subjectRepository.delete(subjectId);
	}
	
//	@Transactional
	public long addSubject(Subject subject) {
//		return subjectRepository.save(subject) != null;
		Subject savedObject= subjectRepository.saveAndFlush(subject);
		return savedObject.getId();
	}

//	@Transactional
	public boolean updateSubject(Subject subject) {
		return subjectRepository.save(subject) != null;
	}
	
//	@Transactional
	public long likeSubject(long id) {
		long likes=0;
		if(subjectRepository.likeSubject(id)>=1) {
			likes=subjectRepository.getLikes(id);
		}
		return likes;
	}
	
//	@Transactional
	public long dislikeSubject(long id) {
		long dislikes=0;
		if(subjectRepository.dislikeSubject(id)>=1) {
			dislikes=subjectRepository.getDisLikes(id);
		}
		return dislikes;
	}

//	@Transactional
	public int updateSubjectName(String subjectName,long subjectId) {
		return subjectRepository.updateSubjectName(subjectName, subjectId);
	}

	public Page<Subject> searchSubject(String searchletters,Pageable pageable) {
		ExampleMatcher customExampleMatcher = ExampleMatcher.matchingAll()
			      .withMatcher("subject", ExampleMatcher.GenericPropertyMatchers.startsWith().ignoreCase());
			      
		Example<Subject> example = Example.of(Subject.from(searchletters),customExampleMatcher);
		return (Page<Subject>) subjectRepository.findAll(example, pageable);
		
	}
	
}
