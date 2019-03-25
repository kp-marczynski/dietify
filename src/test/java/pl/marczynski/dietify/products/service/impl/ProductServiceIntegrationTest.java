package pl.marczynski.dietify.products.service.impl;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.cache.CacheManager;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import pl.marczynski.dietify.core.DietifyApp;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.repository.ProductRepository;
import pl.marczynski.dietify.products.service.ProductService;
import pl.marczynski.dietify.products.web.rest.ProductResourceIntTest;

import javax.persistence.EntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class ProductServiceIntegrationTest {

    @Autowired
    private ProductService productService;

    @Autowired
    private CacheManager cacheManager;

    @Autowired
    private EntityManager em;

    private Product product;

    @Before
    public void setup() {
        this.product = productService.save(ProductResourceIntTest.createEntity(em));
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
        productService.delete(this.product.getId());

        //then
        assertThat(cacheManager.getCacheNames()).contains(ProductRepository.PRODUCTS_EAGER_BY_ID_CACHE);
        assertThat(cacheManager.getCache(ProductRepository.PRODUCTS_EAGER_BY_ID_CACHE).get(this.product.getId())).isNull();
    }

}
