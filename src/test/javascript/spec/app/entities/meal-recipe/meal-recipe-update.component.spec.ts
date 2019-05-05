/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { MealRecipeUpdateComponent } from 'app/entities/meal-recipe/meal-recipe-update.component';
import { MealRecipeService } from 'app/entities/meal-recipe/meal-recipe.service';
import { MealRecipe } from 'app/shared/model/meal-recipe.model';

describe('Component Tests', () => {
    describe('MealRecipe Management Update Component', () => {
        let comp: MealRecipeUpdateComponent;
        let fixture: ComponentFixture<MealRecipeUpdateComponent>;
        let service: MealRecipeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealRecipeUpdateComponent]
            })
                .overrideTemplate(MealRecipeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealRecipeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealRecipeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MealRecipe(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mealRecipe = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MealRecipe();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mealRecipe = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
