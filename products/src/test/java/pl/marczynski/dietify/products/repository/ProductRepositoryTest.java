package pl.marczynski.dietify.products.repository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import pl.marczynski.dietify.products.ProductsApp;
import pl.marczynski.dietify.products.domain.DietType;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.web.rest.DietTypeResourceIT;
import pl.marczynski.dietify.products.web.rest.ProductResourceIT;

import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;


@RunWith(SpringRunner.class)
@SpringBootTest(classes = ProductsApp.class)
public class ProductRepositoryTest {

    private static final Long DEFAULT_AUTHOR_ID = 1L;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EntityManager em;

    private DietType dietType;


    @Before
    public void initTest() {
        this.dietType = createDietType();
    }

    @Test
    @Transactional
    public void shouldAddSuitableDietToProduct() {
        //given
        Product product = productRepository.saveAndFlush(ProductResourceIT.createEntity(em));
        int numberOfDiets = product.getSuitableDiets().size();
        assertThat(numberOfDiets).isEqualTo(0);

        //when
        product.setSuitableDiets(Stream.of(this.dietType).collect(Collectors.toSet()));
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getSuitableDiets()).hasSize(numberOfDiets + 1);
        assertThat(result.getSuitableDiets().iterator().next()).isEqualTo(this.dietType);
    }

    @Test
    @Transactional
    public void shouldRemoveSuitableDietFromProduct() {
        //given
        Product product = ProductResourceIT.createEntity(em);
        product.setSuitableDiets(Stream.of(this.dietType).collect(Collectors.toSet()));
        product = productRepository.saveAndFlush(product);
        assertThat(product.getSuitableDiets().size()).isEqualTo(1);

        //when
        product.getSuitableDiets().clear();
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getSuitableDiets()).hasSize(0);
    }

    @Test
    @Transactional
    public void shouldAddUnsuitableDietToProduct() {
        //given
        Product product = productRepository.saveAndFlush(ProductResourceIT.createEntity(em));
        int numberOfDiets = product.getUnsuitableDiets().size();
        assertThat(numberOfDiets).isEqualTo(0);

        //when
        product.setUnsuitableDiets(Stream.of(this.dietType).collect(Collectors.toSet()));
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getUnsuitableDiets()).hasSize(numberOfDiets + 1);
        assertThat(result.getUnsuitableDiets().iterator().next()).isEqualTo(this.dietType);
    }

    @Test
    @Transactional
    public void shouldRemoveUnsuitableDietFromProduct() {
        //given
        Product product = ProductResourceIT.createEntity(em);
        product.setUnsuitableDiets(Stream.of(this.dietType).collect(Collectors.toSet()));
        product = productRepository.saveAndFlush(product);
        assertThat(product.getUnsuitableDiets().size()).isEqualTo(1);

        //when
        product.getUnsuitableDiets().clear();
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getUnsuitableDiets()).hasSize(0);
    }

    @Test
    @Transactional
    public void shouldFindProductBySearchPhrase() {
        //given
        String searchPhrase = "aa";
        Product product1 = ProductResourceIT.createEntity(em);
        product1.setDescription(searchPhrase);

        Product product2 = ProductResourceIT.createEntity(em);
        product2.setDescription("bbbb");

        Product product3 = ProductResourceIT.createEntity(em);
        product3.setDescription("b" + searchPhrase + "c");

        product1 = productRepository.saveAndFlush(product1);
        product2 = productRepository.saveAndFlush(product2);
        product3 = productRepository.saveAndFlush(product3);

        //when
        Page<Product> result = productRepository.findByDescriptionContainingIgnoreCase(searchPhrase, DEFAULT_AUTHOR_ID, PageRequest.of(0, 10));

        //then
        assertThat(result.getTotalElements()).isEqualTo(2);
        assertThat(result.getContent()).containsAll(Arrays.asList(product1, product3));
        assertThat(result.getContent()).doesNotContain(product2);
    }

    @Test
    @Transactional
    public void shouldFindProductBySearchPhraseIgnoringCase() {
        //given
        String searchPhrase = "aa";
        Product product1 = ProductResourceIT.createEntity(em);
        product1.setDescription(searchPhrase.toUpperCase());

        product1 = productRepository.saveAndFlush(product1);

        //when
        Page<Product> result = productRepository.findByDescriptionContainingIgnoreCase(searchPhrase, DEFAULT_AUTHOR_ID, PageRequest.of(0, 10));

        //then
        assertThat(result.getTotalElements()).isEqualTo(1);
        assertThat(result.getContent()).contains(product1);
    }

    private DietType createDietType() {
        DietType dietType = DietTypeResourceIT.createEntity(em);
        em.persist(dietType);
        em.flush();
        return dietType;
    }
}
