/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { RecipeSuitableForDietUpdateComponent } from 'app/entities/recipe-suitable-for-diet/recipe-suitable-for-diet-update.component';
import { RecipeSuitableForDietService } from 'app/entities/recipe-suitable-for-diet/recipe-suitable-for-diet.service';
import { RecipeSuitableForDiet } from 'app/shared/model/recipe-suitable-for-diet.model';

describe('Component Tests', () => {
    describe('RecipeSuitableForDiet Management Update Component', () => {
        let comp: RecipeSuitableForDietUpdateComponent;
        let fixture: ComponentFixture<RecipeSuitableForDietUpdateComponent>;
        let service: RecipeSuitableForDietService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [RecipeSuitableForDietUpdateComponent]
            })
                .overrideTemplate(RecipeSuitableForDietUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(RecipeSuitableForDietUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RecipeSuitableForDietService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new RecipeSuitableForDiet(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.recipeSuitableForDiet = entity;
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
                    const entity = new RecipeSuitableForDiet();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.recipeSuitableForDiet = entity;
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
