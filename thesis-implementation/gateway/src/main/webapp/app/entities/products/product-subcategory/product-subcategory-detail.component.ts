import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductSubcategory } from 'app/shared/model/products/product-subcategory.model';

@Component({
  selector: 'jhi-product-subcategory-detail',
  templateUrl: './product-subcategory-detail.component.html'
})
export class ProductSubcategoryDetailComponent implements OnInit {
  productSubcategory: IProductSubcategory;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ productSubcategory }) => {
      this.productSubcategory = productSubcategory;
    });
  }

  previousState() {
    window.history.back();
  }
}
