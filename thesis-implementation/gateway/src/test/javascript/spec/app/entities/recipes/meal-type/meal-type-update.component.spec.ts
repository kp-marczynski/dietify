/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealTypeUpdateComponent } from 'app/entities/recipes/meal-type/meal-type-update.component';
import { MealTypeService } from 'app/entities/recipes/meal-type/meal-type.service';
import { MealType } from 'app/shared/model/recipes/meal-type.model';

describe('Component Tests', () => {
  describe('MealType Management Update Component', () => {
    let comp: MealTypeUpdateComponent;
    let fixture: ComponentFixture<MealTypeUpdateComponent>;
    let service: MealTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MealTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MealType(123);
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
        const entity = new MealType();
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
