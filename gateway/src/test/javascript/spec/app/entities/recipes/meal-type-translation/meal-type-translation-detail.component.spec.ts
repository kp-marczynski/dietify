/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealTypeTranslationDetailComponent } from 'app/entities/recipes/meal-type-translation/meal-type-translation-detail.component';
import { MealTypeTranslation } from 'app/shared/model/recipes/meal-type-translation.model';

describe('Component Tests', () => {
  describe('MealTypeTranslation Management Detail Component', () => {
    let comp: MealTypeTranslationDetailComponent;
    let fixture: ComponentFixture<MealTypeTranslationDetailComponent>;
    const route = ({ data: of({ mealTypeTranslation: new MealTypeTranslation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealTypeTranslationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MealTypeTranslationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MealTypeTranslationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mealTypeTranslation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
