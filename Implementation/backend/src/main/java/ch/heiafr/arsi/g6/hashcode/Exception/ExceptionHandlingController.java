package ch.heiafr.arsi.g6.hashcode.Exception;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandlingController {

    @ExceptionHandler(AccountException.class)
    public ResponseEntity<ExceptionResponse> conflictReponse(AccountException ex) {
        ExceptionResponse response = new ExceptionResponse();
        response.setErrorCode(ex.getRef());
        response.setErrorMessage(ex.getMessage());

        return new ResponseEntity<ExceptionResponse>(response, HttpStatus.CONFLICT);
    }
}