/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { NutritionDefinitionTranslationDetailComponent } from 'app/entities/products/nutrition-definition-translation/nutrition-definition-translation-detail.component';
import { NutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';

describe('Component Tests', () => {
  describe('NutritionDefinitionTranslation Management Detail Component', () => {
    let comp: NutritionDefinitionTranslationDetailComponent;
    let fixture: ComponentFixture<NutritionDefinitionTranslationDetailComponent>;
    const route = ({ data: of({ nutritionDefinitionTranslation: new NutritionDefinitionTranslation(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NutritionDefinitionTranslationDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(NutritionDefinitionTranslationDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(NutritionDefinitionTranslationDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.nutritionDefinitionTranslation).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
