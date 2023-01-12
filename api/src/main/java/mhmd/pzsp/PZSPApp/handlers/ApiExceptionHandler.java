package mhmd.pzsp.PZSPApp.handlers;

import mhmd.pzsp.PZSPApp.exceptions.BackendException;
import mhmd.pzsp.PZSPApp.exceptions.BackendSqlException;
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
        var error = "Błąd logiki aplikacji. Wyjątek: " + ex.getClass().getName();
        var status = HttpStatus.BAD_REQUEST;
        return new ResponseEntity<>( new ApiError(status, error, ex), status);
    }

    @ExceptionHandler(BackendSqlException.class)
    protected ResponseEntity<Object> handleBackendException(BackendSqlException ex) {
        var error = "Błąd logiki bazy danych. Wyjątek: " + ex.getClass().getName();
        var status = HttpStatus.CONFLICT;
        return new ResponseEntity<>( new ApiError(status, error, ex), status);
    }
}
