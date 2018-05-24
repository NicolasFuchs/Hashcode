package ch.heiafr.arsi.g6.hashcode.Exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class AccountException extends RuntimeException{

    private String ref;

    public AccountException(String ref ,String exception) {
        super(exception);
        this.ref = ref;
    }

    public String getRef() {
        return ref;
    }
}
