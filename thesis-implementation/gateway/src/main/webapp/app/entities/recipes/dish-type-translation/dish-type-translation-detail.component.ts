import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDishTypeTranslation } from 'app/shared/model/recipes/dish-type-translation.model';

@Component({
  selector: 'jhi-dish-type-translation-detail',
  templateUrl: './dish-type-translation-detail.component.html'
})
export class DishTypeTranslationDetailComponent implements OnInit {
  dishTypeTranslation: IDishTypeTranslation;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ dishTypeTranslation }) => {
      this.dishTypeTranslation = dishTypeTranslation;
    });
  }

  previousState() {
    window.history.back();
  }
}
