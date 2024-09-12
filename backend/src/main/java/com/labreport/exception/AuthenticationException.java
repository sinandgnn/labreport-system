package com.labreport.exception;

import com.labreport.shared.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class AuthenticationException extends RuntimeException {
	public AuthenticationException() {
		super(Messages.getMessageForLocale("labreport.auth.invalid.credentials", LocaleContextHolder.getLocale()));
	}
}
