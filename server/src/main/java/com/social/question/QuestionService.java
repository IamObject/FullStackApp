package com.social.question;



import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
	@Autowired
	QuestionRepository<Question> questionRepository;

	public Page<Question> findAllSubjects(Pageable pageable) {
		return (Page<Question>) questionRepository.findAll(pageable);
	}


	public Optional<Question> findById(Long id) {

		Optional<Question> questions = questionRepository.findById(id);

		if (!questions.isPresent()) {
			throw  new RuntimeException("Question  with id "+ id +" Not Found");
		} else {
			return questions;
		}

	}

	public void deleteByQuestionId(long questionId) {
		 questionRepository.deleteById(questionId);
	}

//	@Transactional
	public void deleteQuestion(Question questionId) {
		questionRepository.delete(questionId);
	}
	
	public boolean addQuestion(Question question) {
		return questionRepository.save(question) != null;
	}

	public boolean updateQuestion(Question question) {
		return questionRepository.save(question) != null;
	}
	
	public long likeQuestion(long id) {
		long likes=0;
		if(questionRepository.likeQuestion(id)>=1) {
			likes=questionRepository.getLikes(id);
		}
		return likes;
	}
	
	public long dislikeQuestion(long id) {
		long dislikes=0;
		if(questionRepository.dislikeQuestion(id)>=1) {
			dislikes=questionRepository.getDisLikes(id);
		}
		return dislikes;
	}
	
	public Page<Question>  getQuestionsbysubjectId(long subjectId,Pageable pageable) {
		
		return questionRepository.getQuestionsbysubjectId(subjectId, pageable);
	}

	public Page<Question> searchQuestion(String searchletters,Pageable pageable) {
		ExampleMatcher customExampleMatcher = ExampleMatcher.matchingAll()
			      .withMatcher("question", ExampleMatcher.GenericPropertyMatchers.startsWith().ignoreCase());
			      
		Example<Question> example = Example.of(Question.from(searchletters),customExampleMatcher);
		return (Page<Question>) questionRepository.findAll(example, pageable);
		
	}


	public long approveQuestion(long id) {
		// TODO Auto-generated method stub
		return questionRepository.approveQuestion(id);
	}	
	
//	@Transactional
//	public int updateSubjectName(String questionName,long questionId) {
//		return questionRepository.updateQuestionName(questionName, questionId);
//	}
	
}
