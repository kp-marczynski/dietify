import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductCategoryTranslation } from 'app/shared/model/products/product-category-translation.model';

@Component({
  selector: 'jhi-product-category-translation-detail',
  templateUrl: './product-category-translation-detail.component.html'
})
export class ProductCategoryTranslationDetailComponent implements OnInit {
  productCategoryTranslation: IProductCategoryTranslation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productCategoryTranslation }) => {
      this.productCategoryTranslation = productCategoryTranslation;
    });
  }

  previousState() {
    window.history.back();
  }
}
