/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { LandingPageCardDetailComponent } from 'app/entities/landing-page-card/landing-page-card-detail.component';
import { LandingPageCard } from 'app/shared/model/landing-page-card.model';

describe('Component Tests', () => {
  describe('LandingPageCard Management Detail Component', () => {
    let comp: LandingPageCardDetailComponent;
    let fixture: ComponentFixture<LandingPageCardDetailComponent>;
    const route = ({ data: of({ landingPageCard: new LandingPageCard(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LandingPageCardDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(LandingPageCardDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LandingPageCardDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.landingPageCard).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
