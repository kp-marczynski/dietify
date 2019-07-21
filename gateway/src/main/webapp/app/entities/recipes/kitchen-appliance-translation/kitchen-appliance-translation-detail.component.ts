import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IKitchenApplianceTranslation } from 'app/shared/model/recipes/kitchen-appliance-translation.model';

@Component({
  selector: 'jhi-kitchen-appliance-translation-detail',
  templateUrl: './kitchen-appliance-translation-detail.component.html'
})
export class KitchenApplianceTranslationDetailComponent implements OnInit {
  kitchenApplianceTranslation: IKitchenApplianceTranslation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ kitchenApplianceTranslation }) => {
      this.kitchenApplianceTranslation = kitchenApplianceTranslation;
    });
  }

  previousState() {
    window.history.back();
  }
}
