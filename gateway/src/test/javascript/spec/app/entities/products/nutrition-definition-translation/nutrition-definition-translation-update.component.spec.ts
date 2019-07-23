/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { NutritionDefinitionTranslationUpdateComponent } from 'app/entities/products/nutrition-definition-translation/nutrition-definition-translation-update.component';
import { NutritionDefinitionTranslationService } from 'app/entities/products/nutrition-definition-translation/nutrition-definition-translation.service';
import { NutritionDefinitionTranslation } from 'app/shared/model/products/nutrition-definition-translation.model';

describe('Component Tests', () => {
  describe('NutritionDefinitionTranslation Management Update Component', () => {
    let comp: NutritionDefinitionTranslationUpdateComponent;
    let fixture: ComponentFixture<NutritionDefinitionTranslationUpdateComponent>;
    let service: NutritionDefinitionTranslationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NutritionDefinitionTranslationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NutritionDefinitionTranslationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NutritionDefinitionTranslationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NutritionDefinitionTranslationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NutritionDefinitionTranslation(123);
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
        const entity = new NutritionDefinitionTranslation();
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
