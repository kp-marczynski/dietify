import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';

@Component({
  selector: 'jhi-product-basic-nutrition-data-detail',
  templateUrl: './product-basic-nutrition-data-detail.component.html'
})
export class ProductBasicNutritionDataDetailComponent implements OnInit {
  productBasicNutritionData: IProductBasicNutritionData;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productBasicNutritionData }) => {
      this.productBasicNutritionData = productBasicNutritionData;
    });
  }

  previousState() {
    window.history.back();
  }
}
