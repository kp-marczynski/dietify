/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { MealTypeTranslationComponent } from 'app/entities/recipes/meal-type-translation/meal-type-translation.component';
import { MealTypeTranslationService } from 'app/entities/recipes/meal-type-translation/meal-type-translation.service';
import { MealTypeTranslation } from 'app/shared/model/recipes/meal-type-translation.model';

describe('Component Tests', () => {
  describe('MealTypeTranslation Management Component', () => {
    let comp: MealTypeTranslationComponent;
    let fixture: ComponentFixture<MealTypeTranslationComponent>;
    let service: MealTypeTranslationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealTypeTranslationComponent],
        providers: []
      })
        .overrideTemplate(MealTypeTranslationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealTypeTranslationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealTypeTranslationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MealTypeTranslation(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mealTypeTranslations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
