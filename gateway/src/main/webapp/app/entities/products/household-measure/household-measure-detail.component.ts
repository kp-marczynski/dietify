import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHouseholdMeasure } from 'app/shared/model/products/household-measure.model';

@Component({
  selector: 'jhi-household-measure-detail',
  templateUrl: './household-measure-detail.component.html'
})
export class HouseholdMeasureDetailComponent implements OnInit {
  householdMeasure: IHouseholdMeasure;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ householdMeasure }) => {
      this.householdMeasure = householdMeasure;
    });
  }

  previousState() {
    window.history.back();
  }
}
