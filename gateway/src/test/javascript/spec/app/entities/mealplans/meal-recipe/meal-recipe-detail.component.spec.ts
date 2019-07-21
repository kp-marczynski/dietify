/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealRecipeDetailComponent } from 'app/entities/mealplans/meal-recipe/meal-recipe-detail.component';
import { MealRecipe } from 'app/shared/model/mealplans/meal-recipe.model';

describe('Component Tests', () => {
  describe('MealRecipe Management Detail Component', () => {
    let comp: MealRecipeDetailComponent;
    let fixture: ComponentFixture<MealRecipeDetailComponent>;
    const route = ({ data: of({ mealRecipe: new MealRecipe(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealRecipeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MealRecipeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MealRecipeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mealRecipe).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
