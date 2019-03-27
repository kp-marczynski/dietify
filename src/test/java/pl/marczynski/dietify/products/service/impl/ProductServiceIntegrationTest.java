package pl.marczynski.dietify.products.service.impl;

import javassist.NotFoundException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cache.CacheManager;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import pl.marczynski.dietify.core.DietifyApp;
import pl.marczynski.dietify.core.domain.User;
import pl.marczynski.dietify.core.repository.UserRepository;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.domain.ProductCreator;
import pl.marczynski.dietify.products.repository.ProductRepository;
import pl.marczynski.dietify.products.service.ProductService;

import javax.persistence.EntityManager;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.Assert.fail;
import static org.mockito.Mockito.when;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
@WithMockUser(username = "user", authorities = {"ROLE_USER"}, password = "user")
public class ProductServiceIntegrationTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private EntityManager em;

    @Mock
    private UserRepository userRepositoryMock;

    private Product product;

    @Before
    public void setup() {
        Optional<User> user = userRepositoryMock.findOneByLogin("user");
        when(userRepositoryMock.findCurrentUser()).thenReturn(user);
        this.product = productService.save(ProductCreator.createEntity(em));
    }

    @Test
    @Transactional
    public void shouldStoreProductInCacheAfterGetEagerById() {
        //when
        productService.findOne(this.product.getId());

        //then
        assertThat(cacheManager.getCacheNames()).contains(ProductRepository.PRODUCTS_EAGER_BY_ID_CACHE);
        Object o = cacheManager.getCache(ProductRepository.PRODUCTS_EAGER_BY_ID_CACHE).get(this.product.getId()).get();
        assertThat(o).isInstanceOf(Product.class);
        Product result = (Product) o;
        assertThat(result).isEqualTo(this.product);
    }

    @Test
    @Transactional
    public void shouldRemoveProductFromCacheWhenUpdatingProduct() {
        //given
        productService.findOne(this.product.getId());
        this.product.setDescription("UPDATED");

        //when
        productService.save(this.product);

        //then
        assertThat(cacheManager.getCacheNames()).contains(ProductRepository.PRODUCTS_EAGER_BY_ID_CACHE);
        assertThat(cacheManager.getCache(ProductRepository.PRODUCTS_EAGER_BY_ID_CACHE).get(this.product.getId())).isNull();
    }

    @Test
    @Transactional
    public void shouldRemoveProductFromCacheWhenDeletingProduct() {
        //given
        productService.findOne(this.product.getId());

        //when
        try {
            productService.delete(this.product.getId());
        } catch (NotFoundException e) {
            fail();
        }

        //then
        assertThat(cacheManager.getCacheNames()).contains(ProductRepository.PRODUCTS_EAGER_BY_ID_CACHE);
        assertThat(cacheManager.getCache(ProductRepository.PRODUCTS_EAGER_BY_ID_CACHE).get(this.product.getId())).isNull();
    }

}
