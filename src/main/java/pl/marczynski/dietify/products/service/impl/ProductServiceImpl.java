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
import pl.marczynski.dietify.core.domain.User;
import pl.marczynski.dietify.core.service.UserService;
import pl.marczynski.dietify.core.web.rest.errors.OperationNotAllowedForCurrentUserException;
import pl.marczynski.dietify.products.domain.Product;
import pl.marczynski.dietify.products.repository.ProductRepository;
import pl.marczynski.dietify.products.service.ProductService;
import pl.marczynski.dietify.products.service.ProductSubcategoryService;

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

    public ProductServiceImpl(ProductRepository productRepository, CacheManager cacheManager, ProductSubcategoryService productSubcategoryService, UserService userService) {
        this.productRepository = productRepository;
        this.cacheManager = cacheManager;
        this.productSubcategoryService = productSubcategoryService;
        this.userService = userService;
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
