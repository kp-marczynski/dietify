import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMealProduct } from 'app/shared/model/mealplans/meal-product.model';

@Component({
  selector: 'jhi-meal-product-detail',
  templateUrl: './meal-product-detail.component.html'
})
export class MealProductDetailComponent implements OnInit {
  mealProduct: IMealProduct;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ mealProduct }) => {
      this.mealProduct = mealProduct;
    });
  }

  previousState() {
    window.history.back();
  }
}
