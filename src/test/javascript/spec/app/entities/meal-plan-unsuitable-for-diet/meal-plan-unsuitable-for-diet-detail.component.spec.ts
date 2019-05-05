/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { MealPlanUnsuitableForDietDetailComponent } from 'app/entities/meal-plan-unsuitable-for-diet/meal-plan-unsuitable-for-diet-detail.component';
import { MealPlanUnsuitableForDiet } from 'app/shared/model/meal-plan-unsuitable-for-diet.model';

describe('Component Tests', () => {
    describe('MealPlanUnsuitableForDiet Management Detail Component', () => {
        let comp: MealPlanUnsuitableForDietDetailComponent;
        let fixture: ComponentFixture<MealPlanUnsuitableForDietDetailComponent>;
        const route = ({ data: of({ mealPlanUnsuitableForDiet: new MealPlanUnsuitableForDiet(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealPlanUnsuitableForDietDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MealPlanUnsuitableForDietDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MealPlanUnsuitableForDietDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.mealPlanUnsuitableForDiet).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
