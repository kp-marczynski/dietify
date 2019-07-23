/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RecipeBasicNutritionDataUpdateComponent } from 'app/entities/recipes/recipe-basic-nutrition-data/recipe-basic-nutrition-data-update.component';
import { RecipeBasicNutritionDataService } from 'app/entities/recipes/recipe-basic-nutrition-data/recipe-basic-nutrition-data.service';
import { RecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';

describe('Component Tests', () => {
  describe('RecipeBasicNutritionData Management Update Component', () => {
    let comp: RecipeBasicNutritionDataUpdateComponent;
    let fixture: ComponentFixture<RecipeBasicNutritionDataUpdateComponent>;
    let service: RecipeBasicNutritionDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RecipeBasicNutritionDataUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RecipeBasicNutritionDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecipeBasicNutritionDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipeBasicNutritionDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RecipeBasicNutritionData(123);
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
        const entity = new RecipeBasicNutritionData();
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
