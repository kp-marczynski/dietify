import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKitchenAppliance } from 'app/shared/model/kitchen-appliance.model';

@Component({
    selector: 'jhi-kitchen-appliance-detail',
    templateUrl: './kitchen-appliance-detail.component.html'
})
export class KitchenApplianceDetailComponent implements OnInit {
    kitchenAppliance: IKitchenAppliance;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ kitchenAppliance }) => {
            this.kitchenAppliance = kitchenAppliance;
        });
    }

    previousState() {
        window.history.back();
    }
}
