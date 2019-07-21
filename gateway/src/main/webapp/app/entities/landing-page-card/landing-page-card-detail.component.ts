import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ILandingPageCard } from 'app/shared/model/landing-page-card.model';

@Component({
  selector: 'jhi-landing-page-card-detail',
  templateUrl: './landing-page-card-detail.component.html'
})
export class LandingPageCardDetailComponent implements OnInit {
  landingPageCard: ILandingPageCard;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ landingPageCard }) => {
      this.landingPageCard = landingPageCard;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
