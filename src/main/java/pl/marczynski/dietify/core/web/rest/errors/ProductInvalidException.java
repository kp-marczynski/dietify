package pl.marczynski.dietify.core.web.rest.errors;

public class ProductInvalidException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public ProductInvalidException(String validationProblem) {
        super("Product did not pass validation! " + validationProblem, "products", "productInvalid");
    }
}
