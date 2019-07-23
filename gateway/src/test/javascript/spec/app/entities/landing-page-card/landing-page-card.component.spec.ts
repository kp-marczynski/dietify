/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { LandingPageCardComponent } from 'app/entities/landing-page-card/landing-page-card.component';
import { LandingPageCardService } from 'app/entities/landing-page-card/landing-page-card.service';
import { LandingPageCard } from 'app/shared/model/landing-page-card.model';

describe('Component Tests', () => {
  describe('LandingPageCard Management Component', () => {
    let comp: LandingPageCardComponent;
    let fixture: ComponentFixture<LandingPageCardComponent>;
    let service: LandingPageCardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LandingPageCardComponent],
        providers: []
      })
        .overrideTemplate(LandingPageCardComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LandingPageCardComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LandingPageCardService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new LandingPageCard(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.landingPageCards[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
