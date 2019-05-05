/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { MealPlanSuitableForDietComponent } from 'app/entities/meal-plan-suitable-for-diet/meal-plan-suitable-for-diet.component';
import { MealPlanSuitableForDietService } from 'app/entities/meal-plan-suitable-for-diet/meal-plan-suitable-for-diet.service';
import { MealPlanSuitableForDiet } from 'app/shared/model/meal-plan-suitable-for-diet.model';

describe('Component Tests', () => {
    describe('MealPlanSuitableForDiet Management Component', () => {
        let comp: MealPlanSuitableForDietComponent;
        let fixture: ComponentFixture<MealPlanSuitableForDietComponent>;
        let service: MealPlanSuitableForDietService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealPlanSuitableForDietComponent],
                providers: []
            })
                .overrideTemplate(MealPlanSuitableForDietComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealPlanSuitableForDietComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealPlanSuitableForDietService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MealPlanSuitableForDiet(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mealPlanSuitableForDiets[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
