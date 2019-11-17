import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IRecipe } from 'app/shared/model/recipes/recipe.model';
import { ProductService } from 'app/entities/products/product';
import { IProduct } from 'app/shared/model/products/product.model';
import { IMealProduct } from 'app/shared/model/mealplans/meal-product.model';
import { IProductPortion } from 'app/shared/model/recipes/product-portion.model';

@Component({
  selector: 'jhi-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit {
  recipe: IRecipe;
  products: IProduct[] = [];
  itemsQueue = 0;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute, protected productService: ProductService) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ recipe }) => {
      this.recipe = recipe;
      for (const section of this.recipe.recipeSections) {
        for (const productPortion of section.productPortions) {
          if (!this.products[productPortion.productId]) {
            this.itemsQueue++;
            this.productService.find(productPortion.productId).subscribe(res => {
              this.itemsQueue--;
              this.products[productPortion.productId] = res.body;
            });
          }
        }
      }
      this.reloadSections();
    });
  }

  reloadSections() {
    if (this.itemsQueue === 0) {
      this.recipe.recipeSections = [...this.recipe.recipeSections];
    } else {
      setTimeout(() => this.reloadSections(), 1000);
    }
  }

  getHouseholdMeasure(productPortion: IProductPortion): string {
    let result = 'g';
    if (productPortion.householdMeasureId) {
      const product = this.products[productPortion.productId];
      if (product) {
        const householdMeasure = product.householdMeasures.find(measure => measure.id === productPortion.householdMeasureId);
        if (householdMeasure) {
          result = householdMeasure.description;
        }
      }
    }
    return result;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  previousState() {
    window.history.back();
  }
}
