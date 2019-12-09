import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOwnedKitchenAppliance } from 'app/shared/model/appointments/owned-kitchen-appliance.model';

@Component({
  selector: 'jhi-owned-kitchen-appliance-detail',
  templateUrl: './owned-kitchen-appliance-detail.component.html'
})
export class OwnedKitchenApplianceDetailComponent implements OnInit {
  ownedKitchenAppliance: IOwnedKitchenAppliance;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ ownedKitchenAppliance }) => {
      this.ownedKitchenAppliance = ownedKitchenAppliance;
    });
  }

  previousState() {
    window.history.back();
  }
}
