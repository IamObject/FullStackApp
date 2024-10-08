package com.social.comment;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.social.subject.Subject;

@Service
public class CommentService {
	@Autowired
	CommentRepository commentRepository;
	
//	@Transactional
	public Page<Comment> findAllCommentss(Pageable pageable) {
		return (Page<Comment>) commentRepository.findAll(pageable);
	}


	public Optional<Comment> findById(Long id) {

		Optional<Comment> comments = commentRepository.findById(id);

		if (!comments.isPresent()) {
			throw new RuntimeException("Comment with id "+ id +" Not Found");
		} else {
			return comments;
		}

	}

	public void deleteByCommentId(long id) {
		commentRepository.deleteById(id);
	}

	public void deleteComment(long id) {
		commentRepository.deleteById(id);
	}

	public long addComment(Comment comment) {
		//return commentRepository.save(comment) != null;
		Comment savedObject= commentRepository.saveAndFlush(comment);
		return savedObject.getId();
	}

	public boolean updateComment(Comment comment) {
		return commentRepository.save(comment) != null;
	}

	public long likeComment(long id) {
		long likes=0;
		if(commentRepository.likeComment(id)>=1) {
			likes=commentRepository.getLikes(id);
		}
		return likes;
	}

	public long dislikeComment(long id) {
		long dislikes=0;
		if(commentRepository.dislikeComment(id)>=1) {
			dislikes=commentRepository.getDisLikes(id);
		}
		return dislikes;
	}
	
	public Page<Comment>  getCommentBybyQuestionId(long subjectId,Pageable pageable) throws Exception {
		return commentRepository.getCommentBybyQuestionId(subjectId, pageable);
	}
	
	
}
