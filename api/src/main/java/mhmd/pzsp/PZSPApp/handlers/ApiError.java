package mhmd.pzsp.PZSPApp.handlers;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class ApiError {
    // to jest używane tylko przy nieosbłużonych wyjątkach przy kontrolerze, jest zrobione na wyrost
    public HttpStatus status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    public final LocalDateTime timestamp;
    public String message;
    public String debugMessage;

    public ApiError(HttpStatus status, String message, Throwable ex) {
        timestamp = LocalDateTime.now();
        this.status = status;
        this.message = message;
        this.debugMessage = ex.getLocalizedMessage();
    }
}