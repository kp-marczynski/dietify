/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { MealTypeUpdateComponent } from 'app/entities/meal-type/meal-type-update.component';
import { MealTypeService } from 'app/entities/meal-type/meal-type.service';
import { MealType } from 'app/shared/model/meal-type.model';

describe('Component Tests', () => {
    describe('MealType Management Update Component', () => {
        let comp: MealTypeUpdateComponent;
        let fixture: ComponentFixture<MealTypeUpdateComponent>;
        let service: MealTypeService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [MealTypeUpdateComponent]
            })
                .overrideTemplate(MealTypeUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MealTypeUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MealTypeService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MealType(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mealType = entity;
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
                    const entity = new MealType();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.mealType = entity;
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
