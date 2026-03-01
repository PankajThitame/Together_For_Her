package com.together_for_her.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.together_for_her.paylods.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandeler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> resourseNotFoundExceptionHandeler(ResourceNotFoundException ex) {
		String mess = ex.getMessage();
		ApiResponse apiResponse = new ApiResponse(mess, false);
		return new ResponseEntity<ApiResponse>(apiResponse, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleMethodArgumentNotValidException(
			MethodArgumentNotValidException ae) {
		Map<String, String> resp = new HashMap<>();
		ae.getBindingResult().getAllErrors().forEach((error) -> {
			String fname = ((FieldError) error).getField();
			String mess = error.getDefaultMessage();
			resp.put(fname, mess);
		});
		
		return new ResponseEntity<Map<String, String>>(resp, HttpStatus.BAD_REQUEST);

	}
	
}
