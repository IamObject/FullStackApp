package com.social.question;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("question")
@CrossOrigin
public class QuestionController {

	@Autowired
	QuestionService questionService;

	@PostMapping(value = "/addquestion")
	public boolean createQuestion(@RequestBody Question question) {
		return questionService.addQuestion(question);
	}

	@GetMapping("/question/{id}")
	public Optional<Question> getQuestionById(@PathVariable(value = "id") Long questionId) {

		return questionService.findById(questionId);

	}

	@PutMapping("/question/{id}")
	public boolean updateQuestion(@Valid @RequestBody Question question) {

		return questionService.updateQuestion(question);
	}

	@DeleteMapping("/question/{id}")
	public ResponseEntity<?> deleteQuestion(@PathVariable(value = "id") Long questionId) {
		Question question = questionService.findById(questionId)
				.orElseThrow(() -> new RuntimeException("Question  with id "+ questionId +" Not Found"));

		questionService.deleteQuestion(question);

		return ResponseEntity.ok().build();
	}

	@GetMapping("/likeQuestionById/{id}")
	public long likePost(@PathVariable(value = "id") Long questionId) {
		return questionService.likeQuestion(questionId);
	}

	@GetMapping("/dislikeQuestionById/{id}")
	public long dislikePost(@PathVariable(value = "id") Long questionId) {
		return questionService.dislikeQuestion(questionId);
	}

	@GetMapping("/getAllQuestions/{subjectid}")
	public Page<Question> getQuestionsbysubjectId(Pageable pageable,
			@PathVariable(value = "subjectid") Long subjectid) {
//		pageable.getSort().ascending();
		return questionService.getQuestionsbysubjectId(subjectid, pageable);
	}
	@GetMapping("/searchquestion")
	public  Page<Question> searchQuestion(String id, Pageable pageable) {
		return questionService.searchQuestion(id,pageable);
	}
	
	@GetMapping("/approveQuestion/{id}")
	public  long approveQuestion(@PathVariable(value = "id") Long questionId) {
		return questionService.approveQuestion(questionId);
	}
}
