package pl.marczynski.dietify.core.web.rest.errors;

public class ProductInvalidException extends BadRequestAlertException {

    private static final long serialVersionUID = 1L;

    public ProductInvalidException() {
        super("Product did not pass validation!", "products", "productInvalid");
    }
}
