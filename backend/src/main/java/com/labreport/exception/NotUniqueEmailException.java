package com.labreport.exception;

import com.labreport.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class NotUniqueEmailException extends RuntimeException {
	public NotUniqueEmailException() {
		super(Messages.getMessageForLocale("labreport.constraints.email.notunique", LocaleContextHolder.getLocale()));
	}
}
