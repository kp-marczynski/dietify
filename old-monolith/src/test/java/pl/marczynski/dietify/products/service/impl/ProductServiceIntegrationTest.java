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
import pl.marczynski.dietify.core.domain.BasicNutritionType;
import pl.marczynski.dietify.core.domain.User;
import pl.marczynski.dietify.core.repository.UserRepository;
import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.repository.ProductRepository;
import pl.marczynski.dietify.products.service.ProductService;
import pl.marczynski.dietify.products.service.dto.BasicNutritionRequestDTO;
import pl.marczynski.dietify.products.service.dto.BasicNutritionResponseDTO;

import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

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

    @Test
    @Transactional
    public void shouldGetBasicNutritionData() {
        //given
        Double energyValue = 2.0;
        Double carbValue = 3.0;
        Double fatValue = 4.0;
        Double proteinValue = 5.0;
        NutritionDefinition energyDefinition = NutritionDefinitionCreator.createEntity();
        energyDefinition.tagname(BasicNutritionType.ENERGY.getTagname());
        NutritionDefinition carbDefinition = NutritionDefinitionCreator.createEntity();
        carbDefinition.tagname(BasicNutritionType.CARBOHYDRATES.getTagname());
        NutritionDefinition fatDefinition = NutritionDefinitionCreator.createEntity();
        fatDefinition.tagname(BasicNutritionType.FAT.getTagname());
        NutritionDefinition proteinDefinition = NutritionDefinitionCreator.createEntity();
        proteinDefinition.tagname(BasicNutritionType.PROTEIN.getTagname());

        em.persist(energyDefinition);
        em.persist(carbDefinition);
        em.persist(fatDefinition);
        em.persist(proteinDefinition);

        NutritionData energyData = NutritionDataCreator.createNutritionData(energyDefinition);
        energyData.setNutritionValue(energyValue);

        NutritionData carbData = NutritionDataCreator.createNutritionData(carbDefinition);
        carbData.setNutritionValue(carbValue);

        NutritionData fatData = NutritionDataCreator.createNutritionData(fatDefinition);
        fatData.setNutritionValue(fatValue);

        NutritionData proteinData = NutritionDataCreator.createNutritionData(proteinDefinition);
        proteinData.setNutritionValue(proteinValue);

        this.product.getNutritionData().addAll(Stream.of(energyData, carbData, fatData, proteinData).collect(Collectors.toSet()));
        this.productService.save(product);

        BasicNutritionRequestDTO request = new BasicNutritionRequestDTO(this.product.getId(), null, 100L);

        //when
        Optional<BasicNutritionResponseDTO> result = this.productService.getProductBasicNutritions(Collections.singletonList(request));

        //then
        assertThat(result).isPresent();
        assertThat(result.get().getEnergy()).isEqualTo(energyValue);
        assertThat(result.get().getCarbohydrates()).isEqualTo(carbValue);
        assertThat(result.get().getFat()).isEqualTo(fatValue);
        assertThat(result.get().getProtein()).isEqualTo(proteinValue);
    }
}
