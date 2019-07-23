/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealTypeTranslationUpdateComponent } from 'app/entities/recipes/meal-type-translation/meal-type-translation-update.component';
import { MealTypeTranslationService } from 'app/entities/recipes/meal-type-translation/meal-type-translation.service';
import { MealTypeTranslation } from 'app/shared/model/recipes/meal-type-translation.model';

describe('Component Tests', () => {
  describe('MealTypeTranslation Management Update Component', () => {
    let comp: MealTypeTranslationUpdateComponent;
    let fixture: ComponentFixture<MealTypeTranslationUpdateComponent>;
    let service: MealTypeTranslationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealTypeTranslationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MealTypeTranslationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealTypeTranslationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealTypeTranslationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MealTypeTranslation(123);
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
        const entity = new MealTypeTranslation();
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
