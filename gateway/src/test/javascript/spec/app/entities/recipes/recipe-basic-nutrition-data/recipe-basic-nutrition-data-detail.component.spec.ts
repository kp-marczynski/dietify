/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RecipeBasicNutritionDataDetailComponent } from 'app/entities/recipes/recipe-basic-nutrition-data/recipe-basic-nutrition-data-detail.component';
import { RecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';

describe('Component Tests', () => {
  describe('RecipeBasicNutritionData Management Detail Component', () => {
    let comp: RecipeBasicNutritionDataDetailComponent;
    let fixture: ComponentFixture<RecipeBasicNutritionDataDetailComponent>;
    const route = ({ data: of({ recipeBasicNutritionData: new RecipeBasicNutritionData(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RecipeBasicNutritionDataDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(RecipeBasicNutritionDataDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RecipeBasicNutritionDataDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.recipeBasicNutritionData).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
