import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {JhiAlertService, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {IProduct} from 'app/shared/model/product.model';
import {AccountService} from 'app/core';

import {ITEMS_PER_PAGE} from 'app/shared';
import {ProductService} from './product.service';
import {IProductCategory} from 'app/shared/model/product-category.model';
import {IProductSubcategory} from 'app/shared/model/product-subcategory.model';
import {filter, map} from 'rxjs/operators';
import {ProductCategoryService} from 'app/entities/product-category';
import {ProductSubcategoryService} from 'app/entities/product-subcategory';
import {ILanguage} from 'app/shared/model/language.model';
import {LanguageService} from 'app/entities/language';

@Component({
    selector: 'jhi-product',
    templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit, OnDestroy, AfterViewInit {
    standaloneView: boolean;
    currentAccount: any;
    products: IProduct[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
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
    selectedLanguage: ILanguage;

    productSubcategories: IProductSubcategory[];
    productCategories: IProductCategory[];
    languages: ILanguage[];

    searchPhrase = '';

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
        protected languageService: LanguageService
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
            .subscribe(
                (res: IProductCategory[]) => (this.productCategories = res),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.languageService
            .query()
            .pipe(
                filter((res: HttpResponse<ILanguage[]>) => res.ok),
                map((res: HttpResponse<ILanguage[]>) => res.body)
            )
            .subscribe(
                (res: ILanguage[]) => {
                    this.languages = res;
                    this.selectedLanguage = this.languages.find(lang => lang.englishName === 'ENGLISH');
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    customTrackBy(index: number, obj: any): any {
        return index;
    }

    loadAll() {
        this.productService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                search: this.searchPhrase.trim(),
                categoryId: this.selectedCategory ? this.selectedCategory.id : '',
                subcategoryId: this.selectedSubcategory ? this.selectedSubcategory.id : '',
                languageId: this.selectedLanguage ? this.selectedLanguage.id : ''
            })
            .subscribe(
                (res: HttpResponse<IProduct[]>) => this.paginateProducts(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
                    search: this.searchPhrase.trim(),
                    categoryId: this.selectedCategory ? this.selectedCategory.id : '',
                    subcategoryId: this.selectedSubcategory ? this.selectedSubcategory.id : '',
                    languageId: this.selectedLanguage ? this.selectedLanguage.id : ''
                }
            });
        }
        this.loadAll();
    }

    clear() {
        this.page = 0;
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

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInProducts();
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

    search() {
        this.page = 1;
        this.transition();
    }

    fetchSubcategories() {
        console.log('fetch');
        this.selectedSubcategory = null;
        if (this.selectedCategory) {
            this.productSubcategoryService
                .query({
                    productCategoryId: this.selectedCategory.id,
                    languageId: this.selectedLanguage.id
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

    ngAfterViewInit(): void {
        if (!this.standaloneView) {
            document.getElementById('product-list-wrapper').style.padding = '2rem';
        }
    }
}
