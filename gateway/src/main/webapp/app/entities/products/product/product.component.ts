import { Component, OnInit, OnDestroy, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { IProduct, Product } from 'app/shared/model/products/product.model';
import { AccountService, JhiLanguageHelper } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ProductService } from './product.service';
import { IProductCategory } from 'app/shared/model/products/product-category.model';
import { IProductSubcategory } from 'app/shared/model/products/product-subcategory.model';
import { ProductSubcategoryService } from 'app/entities/products/product-subcategory';
import { ProductCategoryService } from 'app/entities/products/product-category';

@Component({
  selector: 'jhi-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() passEntry: EventEmitter<Product> = new EventEmitter();
  standaloneView: boolean;

  currentAccount: any;
  products: IProduct[];
  error: any;
  success: any;
  eventSubscriber: Subscription;
  currentSearch: string;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  selectedCategory: IProductCategory;
  selectedSubcategory: IProductSubcategory;
  selectedLanguage: string;

  productSubcategories: IProductSubcategory[];
  productCategories: IProductCategory[];
  languages: any[];

  constructor(
    protected productService: ProductService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected productCategoryService: ProductCategoryService,
    protected productSubcategoryService: ProductSubcategoryService,
    protected languageHelper: JhiLanguageHelper
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      if (data.pagingParams) {
        this.standaloneView = true;
        this.page = data.pagingParams.page;
        this.previousPage = data.pagingParams.page;
        this.reverse = data.pagingParams.ascending;
        this.predicate = data.pagingParams.predicate;
      } else {
        this.standaloneView = false;
        this.page = 1;
        this.previousPage = 1;
        this.reverse = true;
        this.predicate = 'id';
      }
    });
    this.productCategoryService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProductCategory[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProductCategory[]>) => response.body)
      )
      .subscribe((res: IProductCategory[]) => (this.productCategories = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    // if (this.currentSearch) {
    //   this.productService
    //     .search({
    //       page: this.page - 1,
    //       query: this.currentSearch,
    //       size: this.itemsPerPage,
    //       sort: this.sort()
    //     })
    //     .subscribe(
    //       (res: HttpResponse<IProduct[]>) => this.paginateProducts(res.body, res.headers),
    //       (res: HttpErrorResponse) => this.onError(res.message)
    //     );
    //   return;
    // }
    this.productService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        search: this.currentSearch.trim(),
        categoryId: this.selectedCategory ? this.selectedCategory.id : '',
        subcategoryId: this.selectedSubcategory ? this.selectedSubcategory.id : '',
        language: this.selectedLanguage ? this.selectedLanguage : ''
      })
      .subscribe(
        (res: HttpResponse<IProduct[]>) => this.paginateProducts(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  customTrackBy(index: number, obj: any): any {
    return index;
  }

  fetchSubcategories() {
    console.log('fetch');
    this.selectedSubcategory = null;
    if (this.selectedCategory) {
      this.productSubcategoryService
        .query({
          productCategoryId: this.selectedCategory.id,
          language: this.selectedLanguage
        })
        .pipe(
          filter((mayBeOk: HttpResponse<IProductSubcategory[]>) => mayBeOk.ok),
          map((response: HttpResponse<IProductSubcategory[]>) => response.body)
        )
        .subscribe(
          (res: IProductSubcategory[]) => (this.productSubcategories = res),
          (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    if (this.standaloneView) {
      this.router.navigate(['/product'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          search: this.currentSearch,
          sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }
      });
    }
    this.loadAll();
  }

  clear() {
    this.page = 0;
    this.currentSearch = '';
    if (this.standaloneView) {
      this.router.navigate([
        '/product',
        {
          page: this.page,
          sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
        }
      ]);
    }
    this.loadAll();
  }

  search() {
    this.page = 0;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInProducts();
    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IProduct) {
    return item.id;
  }

  registerChangeInProducts() {
    this.eventSubscriber = this.eventManager.subscribe('productListModification', response => this.loadAll());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateProducts(data: IProduct[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    this.products = data;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  ngAfterViewInit(): void {
    if (!this.standaloneView) {
      document.getElementById('product-list-wrapper').style.padding = '2rem';
    }
  }

  passBack(product: Product): void {
    this.passEntry.emit(product);
  }
}
