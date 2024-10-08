package com.social.utilities.localization;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
@Repository
public interface LocalizationRepository <P>  extends JpaRepository<Localization, Long>{
	
	@Query("select l.messageString from  Localization l where l.languageCode = :code")
	String  getLocalizationString(@Param("code") String code);
}
