import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDishType } from 'app/shared/model/dish-type.model';

@Component({
    selector: 'jhi-dish-type-detail',
    templateUrl: './dish-type-detail.component.html'
})
export class DishTypeDetailComponent implements OnInit {
    dishType: IDishType;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dishType }) => {
            this.dishType = dishType;
        });
    }

    previousState() {
        window.history.back();
    }
}
