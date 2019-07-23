/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { DietTypeTranslationComponent } from 'app/entities/products/diet-type-translation/diet-type-translation.component';
import { DietTypeTranslationService } from 'app/entities/products/diet-type-translation/diet-type-translation.service';
import { DietTypeTranslation } from 'app/shared/model/products/diet-type-translation.model';

describe('Component Tests', () => {
  describe('DietTypeTranslation Management Component', () => {
    let comp: DietTypeTranslationComponent;
    let fixture: ComponentFixture<DietTypeTranslationComponent>;
    let service: DietTypeTranslationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DietTypeTranslationComponent],
        providers: []
      })
        .overrideTemplate(DietTypeTranslationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DietTypeTranslationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DietTypeTranslationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new DietTypeTranslation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.dietTypeTranslations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
