import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDietTypeTranslation } from 'app/shared/model/products/diet-type-translation.model';

@Component({
  selector: 'jhi-diet-type-translation-detail',
  templateUrl: './diet-type-translation-detail.component.html'
})
export class DietTypeTranslationDetailComponent implements OnInit {
  dietTypeTranslation: IDietTypeTranslation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dietTypeTranslation }) => {
      this.dietTypeTranslation = dietTypeTranslation;
    });
  }

  previousState() {
    window.history.back();
  }
}
