package mhmd.pzsp.PZSPApp.handlers;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler(BackendException.class)
    protected ResponseEntity<Object> handleBackendException(BackendException ex) {
        var error = "Application logic error. Exception type: " + ex.getClass().getName();
        var status = HttpStatus.I_AM_A_TEAPOT;
        //pzsp2 to ostatecznie nie jest dobre rozwiązanie, trzeba więcej errorów i zależnie od nich kod odpowiedzi
        return new ResponseEntity<>( new ApiError(status, error, ex), status);
    }
}
