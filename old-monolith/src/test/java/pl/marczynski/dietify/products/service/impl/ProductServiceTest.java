package pl.marczynski.dietify.products.service.impl;

import javassist.NotFoundException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.cache.CacheManager;
import pl.marczynski.dietify.core.domain.User;
import pl.marczynski.dietify.core.domain.UserCreator;
import pl.marczynski.dietify.core.service.UserService;
import pl.marczynski.dietify.core.utils.ValidationResult;
import pl.marczynski.dietify.core.web.rest.errors.OperationNotAllowedForCurrentUserException;
import pl.marczynski.dietify.core.web.rest.errors.ProductInvalidException;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.domain.ProductCreator;
import pl.marczynski.dietify.products.repository.ProductRepository;
import pl.marczynski.dietify.products.service.ProductSubcategoryService;
import pl.marczynski.dietify.products.utils.ProductValidator;

import javax.persistence.EntityManager;
import java.util.Optional;

import static org.junit.Assert.fail;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static pl.marczynski.dietify.products.domain.ProductCreator.FIRST_ID;
import static pl.marczynski.dietify.products.domain.ProductCreator.SECOND_ID;

@RunWith(MockitoJUnitRunner.class)
public class ProductServiceTest {

    @Mock
    private UserService userService;

    @Mock
    private ProductRepository productRepository;
    @Mock
    private CacheManager cacheManager;
    @Mock
    private ProductSubcategoryService productSubcategoryService;

    @Mock
    EntityManager entityManager;

    @InjectMocks
    private ProductServiceImpl productService;

    @Mock
    private ProductValidator productValidator;

    private User user;
    private Product product;

    @Before
    public void setup() {
        this.user = UserCreator.createEntity();
        this.user.setId(FIRST_ID);
        this.product = ProductCreator.createEntity(entityManager);
        this.product.setId(FIRST_ID);
        this.product.setAuthor(user);
        when(userService.getCurrentUser()).thenReturn(Optional.of(this.user));
        when(productRepository.findOneWithEagerRelationships(any())).thenReturn(Optional.of(this.product));
        when(productValidator.validate(any())).thenReturn(new ValidationResult());
    }

    @Test
    public void authorShouldBeAbleToEditOwnProduct() {
        //when
        productService.save(product);

        //then
        Mockito.verify(productRepository, times(1)).saveAndFlush(this.product);
    }

    @Test(expected = OperationNotAllowedForCurrentUserException.class)
    public void userShouldNotBeAbleToEditAnotherUserProduct() {
        //given
        User anotherUser = UserCreator.createEntity();
        anotherUser.setId(SECOND_ID);
        this.product.setAuthor(anotherUser);
        //when
        productService.save(product);
    }

    @Test
    public void authorShouldBeAbleToDeleteOwnProduct() {
        //when
        try {
            productService.delete(product.getId());
        } catch (NotFoundException e) {
            fail();
        }

        //then
        Mockito.verify(productRepository, times(1)).deleteById(this.product.getId());
    }

    @Test(expected = OperationNotAllowedForCurrentUserException.class)
    public void userShouldNotBeAbleToDeleteAnotherUserProduct() {
        //given
        User anotherUser = UserCreator.createEntity();
        anotherUser.setId(SECOND_ID);
        this.product.setAuthor(anotherUser);
        //when
        try {
            productService.delete(product.getId());
        } catch (NotFoundException e) {
            fail();
        }
    }

    @Test(expected = ProductInvalidException.class)
    public void whenProductValidationFailedThenExceptionIsThrown() {
        //given
        ValidationResult validationResult = new ValidationResult().validate(false, "Fail");
        when(productValidator.validate(any())).thenReturn(validationResult);

        //when
        productService.save(this.product);
    }
}
