/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealPlanSuitableForDietDetailComponent } from 'app/entities/mealplans/meal-plan-suitable-for-diet/meal-plan-suitable-for-diet-detail.component';
import { MealPlanSuitableForDiet } from 'app/shared/model/mealplans/meal-plan-suitable-for-diet.model';

describe('Component Tests', () => {
  describe('MealPlanSuitableForDiet Management Detail Component', () => {
    let comp: MealPlanSuitableForDietDetailComponent;
    let fixture: ComponentFixture<MealPlanSuitableForDietDetailComponent>;
    const route = ({ data: of({ mealPlanSuitableForDiet: new MealPlanSuitableForDiet(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealPlanSuitableForDietDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MealPlanSuitableForDietDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MealPlanSuitableForDietDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mealPlanSuitableForDiet).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
