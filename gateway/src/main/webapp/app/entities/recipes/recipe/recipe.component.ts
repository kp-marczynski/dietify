import { Component, OnInit, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { IRecipe, Recipe } from 'app/shared/model/recipes/recipe.model';
import { AccountService, JhiLanguageHelper } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { RecipeService } from './recipe.service';
import { Product } from 'app/shared/model/products/product.model';

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
  currentSearch: string;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  selectedLanguage: any;

  languages: any[];

  constructor(
    protected recipeService: RecipeService,
    protected parseLinks: JhiParseLinks,
    protected jhiAlertService: JhiAlertService,
    protected accountService: AccountService,
    protected activatedRoute: ActivatedRoute,
    protected dataUtils: JhiDataUtils,
    protected router: Router,
    protected eventManager: JhiEventManager,
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
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    // if (this.currentSearch) {
    //   this.recipeService
    //     .search({
    //       page: this.page - 1,
    //       query: this.currentSearch,
    //       size: this.itemsPerPage,
    //       sort: this.sort()
    //     })
    //     .subscribe(
    //       (res: HttpResponse<IRecipe[]>) => this.paginateRecipes(res.body, res.headers),
    //       (res: HttpErrorResponse) => this.onError(res.message)
    //     );
    //   return;
    // }
    this.recipeService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
        search: this.currentSearch.trim(),
        language: this.selectedLanguage ? this.selectedLanguage : ''
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
        '/recipe',
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
    this.registerChangeInRecipes();
    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });
  }

  ngAfterViewInit(): void {
    if (!this.standaloneView) {
      document.getElementById('recipe-list-wrapper').style.padding = '2rem';
    }
  }

  passBack(recipe: Recipe): void {
    this.passEntry.emit(recipe);
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

  customTrackBy(index: number, obj: any): any {
    return index;
  }
}
