import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {JhiAlertService, JhiDataUtils, JhiEventManager, JhiParseLinks} from 'ng-jhipster';

import {IRecipe, Recipe} from 'app/shared/model/recipe.model';
import {AccountService} from 'app/core';

import {ITEMS_PER_PAGE} from 'app/shared';
import {RecipeService} from './recipe.service';
import {ILanguage} from 'app/shared/model/language.model';
import {filter, map} from 'rxjs/operators';
import {LanguageService} from 'app/entities/language';

@Component({
    selector: 'jhi-recipe',
    templateUrl: './recipe.component.html'
})
export class RecipeComponent implements OnInit, OnDestroy, AfterViewInit {
    @Output() passEntry: EventEmitter<Recipe> = new EventEmitter();
    standaloneView: boolean;

    currentAccount: any;
    recipes: IRecipe[];
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

    searchPhrase = '';

    selectedLanguage: ILanguage;

    languages: ILanguage[];

    constructor(
        protected recipeService: RecipeService,
        protected parseLinks: JhiParseLinks,
        protected jhiAlertService: JhiAlertService,
        protected accountService: AccountService,
        protected activatedRoute: ActivatedRoute,
        protected dataUtils: JhiDataUtils,
        protected router: Router,
        protected eventManager: JhiEventManager,
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

    loadAll() {
        this.recipeService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                searchPhrase: this.searchPhrase.trim(),
                languageId: this.selectedLanguage ? this.selectedLanguage.id : ''
            })
            .subscribe(
                (res: HttpResponse<IRecipe[]>) => this.paginateRecipes(res.body, res.headers),
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
            this.router.navigate(['/recipe'], {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
                    searchPhrase: this.searchPhrase.trim(),
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
                '/recipe',
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
        this.registerChangeInRecipes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IRecipe) {
        return item.id;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    registerChangeInRecipes() {
        this.eventSubscriber = this.eventManager.subscribe('recipeListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateRecipes(data: IRecipe[], headers: HttpHeaders) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
        this.recipes = data;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    search() {
        this.page = 1;
        this.transition();
    }

    ngAfterViewInit(): void {
        if (!this.standaloneView) {
            document.getElementById('product-list-wrapper').style.padding = '2rem';
        }
    }

    passBack(recipe: Recipe): void {
        this.passEntry.emit(recipe);
    }
}
