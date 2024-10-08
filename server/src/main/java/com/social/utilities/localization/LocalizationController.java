package com.social.utilities.localization;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController
@RequestMapping("localization")
public class LocalizationController {

	@Autowired
	LocalizationService localizationService;
	@ResponseBody
	@GetMapping("/getLocalizationStringByLangCode/{code}")
	public  Map<String, String> getSubjectById(@PathVariable(value = "code") String code) throws JsonParseException, JsonMappingException, IOException {

		return (Map<String, String>)localizationService.getLocalizationStringByLangCode(code);

	}
	
	
}
