package com.social.utilities.localization;

import java.io.Serializable;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "localization")
@EntityListeners(AuditingEntityListener.class)
@Data
public class Localization implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@Column(name="languageId")
int languageId;
@Column(name="languageCode")
String languageCode;
@Column(name="messageString")
String messageString;

}
