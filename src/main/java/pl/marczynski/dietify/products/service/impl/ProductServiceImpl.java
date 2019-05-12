package pl.marczynski.dietify.products.service.impl;

import javassist.NotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.marczynski.dietify.core.domain.BasicNutritionType;
import pl.marczynski.dietify.core.domain.User;
import pl.marczynski.dietify.core.service.UserService;
import pl.marczynski.dietify.core.utils.ValidationResult;
import pl.marczynski.dietify.core.web.rest.errors.OperationNotAllowedForCurrentUserException;
import pl.marczynski.dietify.core.web.rest.errors.ProductInvalidException;
import pl.marczynski.dietify.products.domain.HouseholdMeasure;
import pl.marczynski.dietify.products.domain.NutritionData;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.repository.ProductRepository;
import pl.marczynski.dietify.products.service.ProductService;
import pl.marczynski.dietify.products.service.ProductSubcategoryService;
import pl.marczynski.dietify.products.service.dto.BasicNutritionRequestDTO;
import pl.marczynski.dietify.products.service.dto.BasicNutritionResponseDTO;
import pl.marczynski.dietify.products.utils.ProductValidator;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing Product.
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;
    private final CacheManager cacheManager;
    private final ProductSubcategoryService productSubcategoryService;
    private final UserService userService;
    private final ProductValidator productValidator;

    public ProductServiceImpl(ProductRepository productRepository, CacheManager cacheManager, ProductSubcategoryService productSubcategoryService, UserService userService, ProductValidator productValidator) {
        this.productRepository = productRepository;
        this.cacheManager = cacheManager;
        this.productSubcategoryService = productSubcategoryService;
        this.userService = userService;
        this.productValidator = productValidator;
    }

    /**
     * Save a product.
     *
     * @param product the entity to save
     * @return the persisted entity
     */
    @Override
    public Product save(Product product) {
        log.debug("Request to save Product : {}", product);
        if (!hasRightsToPersistProduct(product)) {
            throw new OperationNotAllowedForCurrentUserException();
        }
        ValidationResult validationResult = productValidator.validate(product);
        if (!validationResult.hasValidationPassed()) {
            throw new ProductInvalidException(validationResult.getValidationProblem());
        }
        this.clearProductCaches(product);
        if (product.getAuthor() == null) {
            product.setAuthor(userService.getCurrentUser().get());
        }
        Product result = productRepository.saveAndFlush(product);
        productSubcategoryService.removeOrphans();
        return result;
    }

    private boolean hasRightsToPersistProduct(Product product) {
        Optional<User> currentUser = userService.getCurrentUser();
        if (!currentUser.isPresent()) {
            return false;
        } else if (product.getId() == null || product.getAuthor() == null) {
            return true;
        } else return product.getAuthor().equals(currentUser.get());
    }

    /**
     * Get all the products.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<Product> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findAll(pageable);
    }

    /**
     * Get all the Product with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    public Page<Product> findAllWithEagerRelationships(Pageable pageable) {
        return productRepository.findAllWithEagerRelationships(pageable);
    }


    /**
     * Get one product by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<Product> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findOneWithEagerRelationships(id);
    }

    /**
     * Delete the product by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) throws NotFoundException {
        log.debug("Request to delete Product : {}", id);
        Optional<Product> product = productRepository.findOneWithEagerRelationships(id);
        if (!product.isPresent()) {
            throw new NotFoundException("Product not found");
        }
        if (!hasRightsToPersistProduct(product.get())) {
            throw new OperationNotAllowedForCurrentUserException();
        }
        this.clearProductCaches(id);
        productRepository.deleteById(id);
        productSubcategoryService.removeOrphans();
    }

    @Override
    public Page<Product> findBySearchAndFilters(String searchPhrase, Long languageId, Long categoryId, Long subcategoryId, Pageable pageable) {
        if (subcategoryId != null) {
            return productRepository.findByDescriptionContainingIgnoreCaseAndSubcategoryId(searchPhrase, subcategoryId, pageable);
        } else if (categoryId != null) {
            return productRepository.findByDescriptionContainingIgnoreCaseAndSubcategoryCategoryIdAndLanguageId(searchPhrase, categoryId, languageId, pageable);
        } else if (languageId != null) {
            return productRepository.findByDescriptionContainingIgnoreCaseAndLanguageId(searchPhrase, languageId, pageable);
        } else {
            return this.productRepository.findByDescriptionContainingIgnoreCase(searchPhrase, pageable);
        }
    }

    @Override
    public Optional<BasicNutritionResponseDTO> getProductBasicNutritions(List<BasicNutritionRequestDTO> nutritionRequestDTOs) {
        BasicNutritionResponseDTO nutritionResponse = new BasicNutritionResponseDTO();

        for (BasicNutritionRequestDTO nutritionRequest : nutritionRequestDTOs) {
            Optional<Product> product = productRepository.findOneWithEagerRelationships(nutritionRequest.getProductId());
            if (product.isPresent()) {
                Double enerc_kcal = product.get().getNutritionData().stream()
                    .filter(nutritionData -> nutritionData.getNutritionDefinition().getTagname().equals(BasicNutritionType.ENERGY.getTagname()))
                    .findFirst().orElse(new NutritionData()).getNutritionValue();
                Double carbohydrates = product.get().getNutritionData().stream()
                    .filter(nutritionData -> nutritionData.getNutritionDefinition().getTagname().equals(BasicNutritionType.CARBOHYDRATES.getTagname()))
                    .findFirst().orElse(new NutritionData()).getNutritionValue();
                Double protein = product.get().getNutritionData().stream()
                    .filter(nutritionData -> nutritionData.getNutritionDefinition().getTagname().equals(BasicNutritionType.PROTEIN.getTagname()))
                    .findFirst().orElse(new NutritionData()).getNutritionValue();
                Double fat = product.get().getNutritionData().stream()
                    .filter(nutritionData -> nutritionData.getNutritionDefinition().getTagname().equals(BasicNutritionType.FAT.getTagname()))
                    .findFirst().orElse(new NutritionData()).getNutritionValue();
                Double weight = nutritionRequest.getAmount().doubleValue();
                if (enerc_kcal == null || carbohydrates == null || fat == null || protein == null) {
                    return Optional.empty();
                }
                if (nutritionRequest.getHouseholdMeasureId() != null) {
                    Double gramsWeight = product.get().getHouseholdMeasures().stream().filter(measure -> measure.getId().equals(nutritionRequest.getHouseholdMeasureId())).findFirst().orElse(new HouseholdMeasure()).getGramsWeight();
                    if (gramsWeight != null) {
                        weight *= gramsWeight;
                        enerc_kcal *= gramsWeight;
                        carbohydrates *= gramsWeight;
                        protein *= gramsWeight;
                        fat *= gramsWeight;
                    }
                }
                nutritionResponse.addWeight(weight);
                nutritionResponse.addEnergy(enerc_kcal * nutritionRequest.getAmount() / 100);
                nutritionResponse.addCarbohydrates(carbohydrates * nutritionRequest.getAmount() / 100);
                nutritionResponse.addProtein(protein * nutritionRequest.getAmount() / 100);
                nutritionResponse.addFat(fat * nutritionRequest.getAmount() / 100);
            } else {
                return Optional.empty();
            }
        }
        System.out.println(nutritionResponse);
        return Optional.of(nutritionResponse);
    }

    private void clearProductCaches(Product product) {
        if (product.getId() != null) {
            clearProductCaches(product.getId());
        }
    }

    private void clearProductCaches(long productId) {
        Cache cache = cacheManager.getCache(ProductRepository.PRODUCTS_EAGER_BY_ID_CACHE);
        if (cache != null) {
            cache.evict(productId);
        }
    }
}
