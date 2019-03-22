import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDietType } from 'app/shared/model/diet-type.model';

@Component({
    selector: 'jhi-diet-type-detail',
    templateUrl: './diet-type-detail.component.html'
})
export class DietTypeDetailComponent implements OnInit {
    dietType: IDietType;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dietType }) => {
            this.dietType = dietType;
        });
    }

    previousState() {
        window.history.back();
    }
}
