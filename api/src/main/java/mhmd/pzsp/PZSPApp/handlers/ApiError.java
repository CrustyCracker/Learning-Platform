package mhmd.pzsp.PZSPApp.handlers;

import com.fasterxml.jackson.annotation.JsonFormat;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

public class ApiError {
    public HttpStatus status;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy hh:mm:ss")
    public final LocalDateTime timestamp;
    public String hiddenMessage;
    public String userMessage;

    public ApiError(HttpStatus status, String hiddenMessage, Throwable ex) {
        timestamp = LocalDateTime.now();
        this.status = status;
        this.hiddenMessage = hiddenMessage;
        this.userMessage = ex.getLocalizedMessage();
    }

    public ApiError(HttpStatus status, String hiddenMessage){
        timestamp = LocalDateTime.now();
        this.status = status;
        this.hiddenMessage = hiddenMessage;
    }
}