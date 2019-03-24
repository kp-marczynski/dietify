package pl.marczynski.dietify.products.repository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;
import pl.marczynski.dietify.core.DietifyApp;
import pl.marczynski.dietify.products.domain.*;
import pl.marczynski.dietify.products.web.rest.DietTypeResourceIntTest;
import pl.marczynski.dietify.products.web.rest.NutritionDefinitionResourceIntTest;
import pl.marczynski.dietify.products.web.rest.ProductResourceIntTest;

import javax.persistence.EntityManager;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = DietifyApp.class)
public class ProductRepositoryTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Double DEFAULT_GRAMS_WEIGHT = 0D;
    private static final Double UPDATED_GRAMS_WEIGHT = 1D;

    private static final Boolean DEFAULT_IS_VISIBLE = false;
    private static final Boolean UPDATED_IS_VISIBLE = true;

    private static final Double DEFAULT_NUTRITION_VALUE = 0D;
    private static final Double UPDATED_NUTRITION_VALUE = 1D;

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
    public void shouldAddHouseholdMeasureToProduct() {
        //given
        Product product = productRepository.saveAndFlush(ProductResourceIntTest.createEntity(em));
        int numberOfMeasures = product.getHouseholdMeasures().size();
        HouseholdMeasure houseHoldMeasure = createHouseHoldMeasure();
        assertThat(numberOfMeasures).isEqualTo(0);

        //when
        product.addHouseholdMeasures(houseHoldMeasure);
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getHouseholdMeasures()).hasSize(numberOfMeasures + 1);
    }

    @Test
    @Transactional
    public void shouldUpdateHouseholdMeasureInProduct() {
        //given
        HouseholdMeasure householdMeasure = createHouseHoldMeasure();
        Product product = ProductResourceIntTest.createEntity(em);
        product.addHouseholdMeasures(householdMeasure);
        product = productRepository.saveAndFlush(product);
        int numberOfMeasures = product.getHouseholdMeasures().size();
        assertThat(numberOfMeasures).isEqualTo(1);

        //when
        HouseholdMeasure updateMeasure = product.getHouseholdMeasures().iterator().next();
        updateMeasure.setDescription(UPDATED_DESCRIPTION);
        updateMeasure.setGramsWeight(UPDATED_GRAMS_WEIGHT);
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getHouseholdMeasures()).hasSize(numberOfMeasures);
        HouseholdMeasure resultMeasure = result.getHouseholdMeasures().iterator().next();
        assertThat(resultMeasure.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(resultMeasure.getGramsWeight()).isEqualTo(UPDATED_GRAMS_WEIGHT);
    }

    @Test
    @Transactional
    public void shouldRemoveHouseholdMeasureFromProduct() {
        //given
        HouseholdMeasure houseHoldMeasure = createHouseHoldMeasure();
        Product product = ProductResourceIntTest.createEntity(em);
        product.addHouseholdMeasures(houseHoldMeasure);
        product = productRepository.saveAndFlush(product);
        int numberOfMeasures = product.getHouseholdMeasures().size();
        assertThat(numberOfMeasures).isEqualTo(1);

        //when
        product.getHouseholdMeasures().clear();
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getHouseholdMeasures()).hasSize(numberOfMeasures - 1);
    }

    @Test
    @Transactional
    public void shouldAddNutritionDataToProduct() {
        //given
        Product product = productRepository.saveAndFlush(ProductResourceIntTest.createEntity(em));
        int numberOfNutritions = product.getNutritionData().size();
        NutritionData nutritionData = createNutritionData();
        assertThat(numberOfNutritions).isEqualTo(0);

        //when
        product.addNutritionData(nutritionData);
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getNutritionData()).hasSize(numberOfNutritions + 1);
    }

    @Test
    @Transactional
    public void shouldUpdateNutritionDataInProduct() {
        //given
        NutritionData nutritionData = createNutritionData();
        Product product = ProductResourceIntTest.createEntity(em);
        product.addNutritionData(nutritionData);
        product = productRepository.saveAndFlush(product);
        int numberOfNutritions = product.getNutritionData().size();
        assertThat(numberOfNutritions).isEqualTo(1);

        //when
        NutritionData updateNutrition = product.getNutritionData().iterator().next();
        updateNutrition.setNutritionValue(UPDATED_NUTRITION_VALUE);
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getNutritionData()).hasSize(numberOfNutritions);
        NutritionData resultNutrition = result.getNutritionData().iterator().next();
        assertThat(resultNutrition.getNutritionValue()).isEqualTo(UPDATED_NUTRITION_VALUE);
    }

    @Test
    @Transactional
    public void shouldRemoveNutritionDataFromProduct() {
        //given
        NutritionData nutritionData = createNutritionData();
        Product product = ProductResourceIntTest.createEntity(em);
        product.addNutritionData(nutritionData);
        product = productRepository.saveAndFlush(product);
        int numberOfNutritions = product.getNutritionData().size();
        assertThat(numberOfNutritions).isEqualTo(1);

        //when
        product.getNutritionData().clear();
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getNutritionData()).hasSize(numberOfNutritions - 1);
    }

    @Test
    @Transactional
    public void shouldAddSuitableDietToProduct() {
        //given
        Product product = productRepository.saveAndFlush(ProductResourceIntTest.createEntity(em));
        int numberOfDiets = product.getSuitableDiets().size();
        assertThat(numberOfDiets).isEqualTo(0);

        //when
        product.addSuitableDiets(this.dietType);
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getSuitableDiets()).hasSize(numberOfDiets + 1);
        assertThat(result.getSuitableDiets().iterator().next()).isEqualTo(this.dietType);
    }

    @Test
    @Transactional
    public void shouldRemoveSuitableDietFromProduct() {
        //given
        Product product = ProductResourceIntTest.createEntity(em);
        product.addSuitableDiets(this.dietType);
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
        Product product = productRepository.saveAndFlush(ProductResourceIntTest.createEntity(em));
        int numberOfDiets = product.getUnsuitableDiets().size();
        assertThat(numberOfDiets).isEqualTo(0);

        //when
        product.addUnsuitableDiets(this.dietType);
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getUnsuitableDiets()).hasSize(numberOfDiets + 1);
        assertThat(result.getUnsuitableDiets().iterator().next()).isEqualTo(this.dietType);
    }

    @Test
    @Transactional
    public void shouldRemoveUnsuitableDietFromProduct() {
        //given
        Product product = ProductResourceIntTest.createEntity(em);
        product.addUnsuitableDiets(this.dietType);
        product = productRepository.saveAndFlush(product);
        assertThat(product.getUnsuitableDiets().size()).isEqualTo(1);

        //when
        product.getUnsuitableDiets().clear();
        Product result = productRepository.saveAndFlush(product);

        //then
        assertThat(result.getUnsuitableDiets()).hasSize(0);
    }

    private HouseholdMeasure createHouseHoldMeasure() {
        return new HouseholdMeasure()
            .description(DEFAULT_DESCRIPTION)
            .gramsWeight(DEFAULT_GRAMS_WEIGHT)
            .isVisible(DEFAULT_IS_VISIBLE);
    }

    private NutritionData createNutritionData() {
        NutritionData nutritionData = new NutritionData()
            .nutritionValue(DEFAULT_NUTRITION_VALUE);
        // Add required entity
        NutritionDefinition nutritionDefinition = NutritionDefinitionResourceIntTest.createEntity(em);
        em.persist(nutritionDefinition);
        em.flush();
        nutritionData.setNutritionDefinition(nutritionDefinition);
        return nutritionData;
    }

    private DietType createDietType() {
        DietType dietType = DietTypeResourceIntTest.createEntity(em);
        em.persist(dietType);
        em.flush();
        return dietType;
    }
}
