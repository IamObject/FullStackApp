package com.social.utilities.localization;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
@Service
public class LocalizationService {
	@Autowired
	LocalizationRepository<Localization> localizationRepository;

	public Map<String, String> getLocalizationStringByLangCode(String code) throws JsonParseException, JsonMappingException, IOException {
		String msgString=localizationRepository.getLocalizationString(code);
//		ObjectMapper mapper = new ObjectMapper();
		Map<String, String> response = new ObjectMapper().readValue(msgString, HashMap.class);
		return response;

	}
}
