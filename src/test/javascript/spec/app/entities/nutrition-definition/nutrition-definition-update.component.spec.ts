/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { NutritionDefinitionUpdateComponent } from 'app/entities/nutrition-definition/nutrition-definition-update.component';
import { NutritionDefinitionService } from 'app/entities/nutrition-definition/nutrition-definition.service';
import { NutritionDefinition } from 'app/shared/model/nutrition-definition.model';

describe('Component Tests', () => {
    describe('NutritionDefinition Management Update Component', () => {
        let comp: NutritionDefinitionUpdateComponent;
        let fixture: ComponentFixture<NutritionDefinitionUpdateComponent>;
        let service: NutritionDefinitionService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [NutritionDefinitionUpdateComponent]
            })
                .overrideTemplate(NutritionDefinitionUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(NutritionDefinitionUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NutritionDefinitionService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new NutritionDefinition(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nutritionDefinition = entity;
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
                    const entity = new NutritionDefinition();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.nutritionDefinition = entity;
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
