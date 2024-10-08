package com.social.subject;

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
@RequestMapping("subjects")
@CrossOrigin
//(origins = "http://192.168.1.11:4200")
public class SubjectController {

	@Autowired
	SubjectService subjectService;

	@GetMapping("/allSubjects")
	public Page<Subject> getAllSubjects(Pageable pageable) {
//		pageable.getSort().and(Sort(Direction.ASC));
		return subjectService.findAllSubjects(pageable);
		
	}

	@PostMapping("/addsubject")
	public long createSubject(@RequestBody @Valid Subject subject) {
		return subjectService.addSubject(subject);
	}

	@GetMapping("/getSubjectById/{id}")
	public Optional<Subject> getSubjectById(@PathVariable(value = "id") Long subjectId) {

		return subjectService.findById(subjectId);

	}

	@PutMapping("/updateSubjectById/{id}")
	public int updateSubjectName(@PathVariable(value = "id") Long subjectId,
			@Valid @RequestBody Subject subjectDetails) {

		return subjectService.updateSubjectName(subjectDetails.getSubject(), subjectId);
	}

	// Delete a Subject
	@DeleteMapping("/deleteSubjectById/{id}")
	public ResponseEntity<?> deleteBySubjectId(@PathVariable(value = "id") Long subjectId) {

		subjectService.deleteBySubjectId(subjectId);

		return ResponseEntity.ok().build();
	}

	@PutMapping("/likeSubjectById/{id}")
	public long likePost(@PathVariable(value = "id") Long subjectId) {
		return subjectService.likeSubject(subjectId);

	}

	@PutMapping("/dislikeSubjectById/{id}")
	public long dislikePost(@PathVariable(value = "id") Long subjectId) {
		return subjectService.dislikeSubject(subjectId);
	}
	@GetMapping("/searchsubject")
	public  Page<Subject> searchSubject(String id, Pageable pageable) {
		return subjectService.searchSubject(id,pageable);
	}
}
