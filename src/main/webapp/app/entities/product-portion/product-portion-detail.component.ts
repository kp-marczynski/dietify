import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductPortion } from 'app/shared/model/product-portion.model';

@Component({
    selector: 'jhi-product-portion-detail',
    templateUrl: './product-portion-detail.component.html'
})
export class ProductPortionDetailComponent implements OnInit {
    productPortion: IProductPortion;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ productPortion }) => {
            this.productPortion = productPortion;
        });
    }

    previousState() {
        window.history.back();
    }
}
