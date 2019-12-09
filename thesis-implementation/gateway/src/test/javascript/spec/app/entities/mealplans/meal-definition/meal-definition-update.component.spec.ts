/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealDefinitionUpdateComponent } from 'app/entities/mealplans/meal-definition/meal-definition-update.component';
import { MealDefinitionService } from 'app/entities/mealplans/meal-definition/meal-definition.service';
import { MealDefinition } from 'app/shared/model/mealplans/meal-definition.model';

describe('Component Tests', () => {
  describe('MealDefinition Management Update Component', () => {
    let comp: MealDefinitionUpdateComponent;
    let fixture: ComponentFixture<MealDefinitionUpdateComponent>;
    let service: MealDefinitionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealDefinitionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MealDefinitionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealDefinitionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealDefinitionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MealDefinition(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MealDefinition();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
