package com.labreport.error;

import com.labreport.exception.AuthenticationException;
import com.labreport.exception.NotUniqueEmailException;
import com.labreport.shared.Messages;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ErrorHandler {

	@ExceptionHandler({
			MethodArgumentNotValidException.class,
			AuthenticationException.class,
			NotUniqueEmailException.class
	})
	ResponseEntity<ApiError> handleException(Exception exception, HttpServletRequest request) {
		ApiError apiError = new ApiError();
		apiError.setPath(request.getRequestURI());
		apiError.setMessage(exception.getMessage());
		if (exception instanceof MethodArgumentNotValidException) {
			String message = Messages.getMessageForLocale("labreport.error.validation", LocaleContextHolder.getLocale());
			apiError.setMessage(message);
			apiError.setStatus(400);
			Map<String,String> validationErrors = new HashMap<>();
			for (FieldError fieldError : ((MethodArgumentNotValidException) exception).getBindingResult().getFieldErrors()) {
				validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
			}
			apiError.setValidationErrors(validationErrors);
		} else if (exception instanceof AuthenticationException) {
			apiError.setStatus(401);
		} else if (exception instanceof NotUniqueEmailException) {
			String message = Messages.getMessageForLocale("labreport.error.validation", LocaleContextHolder.getLocale());
			apiError.setMessage(message);
			apiError.setStatus(400);
			Map<String,String> validationErrors = new HashMap<>();
			validationErrors.put("email", exception.getMessage());
			apiError.setValidationErrors(validationErrors);
		}
		return ResponseEntity.status(apiError.getStatus()).body(apiError);
	}

}
