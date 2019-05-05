/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { MealRecipeComponent } from 'app/entities/meal-recipe/meal-recipe.component';
import { MealRecipeService } from 'app/entities/meal-recipe/meal-recipe.service';
import { MealRecipe } from 'app/shared/model/meal-recipe.model';

describe('Component Tests', () => {
    describe('MealRecipe Management Component', () => {
        let comp: MealRecipeComponent;
        let fixture: ComponentFixture<MealRecipeComponent>;
        let service: MealRecipeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealRecipeComponent],
                providers: []
            })
                .overrideTemplate(MealRecipeComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealRecipeComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealRecipeService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MealRecipe(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.mealRecipes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
