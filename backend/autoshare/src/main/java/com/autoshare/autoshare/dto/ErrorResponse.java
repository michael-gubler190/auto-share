package com.autoshare.autoshare.dto;

import lombok.Value;
import java.time.OffsetDateTime;

@Value
public class ErrorResponse {
    boolean success = false;
    String message;
    String path;
    int status;
    OffsetDateTime timestamp = OffsetDateTime.now();
}
