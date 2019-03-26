package pl.marczynski.dietify.core.web.rest.errors;

public class OperationNotAllowedForCurrentUserException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public OperationNotAllowedForCurrentUserException() {
        super("Operation not allowed for current user!", "products", "userNotAllowed");
    }
}
