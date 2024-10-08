package com.social.comment;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
@RequestMapping("comment")
@CrossOrigin
public class CommentController {

	@Autowired
	CommentService commentService;

	@PostMapping(value = "/addComment")
	public long createQuestion(@RequestBody Comment question) {
		return commentService.addComment(question);
	}

	@GetMapping("/{id}")
	public Optional<Comment> getCommentsByQuestionId(@PathVariable(value = "id") Long questionId) throws Exception {
     
		
		return commentService.findById(questionId);

	}

	@PutMapping("/{id}")
	public boolean updateQuestion(@Valid @RequestBody Comment question) {

		return commentService.updateComment(question);
	}

	@DeleteMapping("/{id}")
	public void deleteQuestion(@PathVariable(value = "id") long questionId) {
				
		 commentService.deleteComment(questionId);
	}

	@GetMapping("/likeCommentById/{id}")
	public long likecomment(@PathVariable(value = "id") long id) {
		return commentService.likeComment(id);
	}

	@GetMapping("/dislikeCommentById/{id}")
	public long dislikecomment(@PathVariable(value = "id") long questionId) {
		return commentService.dislikeComment(questionId);
	}

	@GetMapping("/getAllCommentsByQuestionId/{questionId}")
	public Page<Comment> getCommentBybyQuestionId(Pageable pageable,
			@PathVariable(value = "questionId") Long questionId) throws Exception {
		   
		return commentService.getCommentBybyQuestionId(questionId, pageable);
	}
}
