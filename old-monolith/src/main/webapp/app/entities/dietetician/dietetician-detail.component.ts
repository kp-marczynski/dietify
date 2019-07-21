import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDietetician } from 'app/shared/model/dietetician.model';

@Component({
    selector: 'jhi-dietetician-detail',
    templateUrl: './dietetician-detail.component.html'
})
export class DieteticianDetailComponent implements OnInit {
    dietetician: IDietetician;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ dietetician }) => {
            this.dietetician = dietetician;
        });
    }

    previousState() {
        window.history.back();
    }
}
