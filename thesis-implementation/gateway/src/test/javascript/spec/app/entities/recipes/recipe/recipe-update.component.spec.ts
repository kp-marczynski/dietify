/* tslint:disable max-line-length */
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RecipeUpdateComponent } from 'app/entities/recipes/recipe/recipe-update.component';
import { RecipeService } from 'app/entities/recipes/recipe/recipe.service';
import { Recipe } from 'app/shared/model/recipes/recipe.model';
import { RecipeBasicNutritionData } from 'app/shared/model/recipes/recipe-basic-nutrition-data.model';

describe('Component Tests', () => {
  describe('Recipe Management Update Component', () => {
    let comp: RecipeUpdateComponent;
    let fixture: ComponentFixture<RecipeUpdateComponent>;
    let service: RecipeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RecipeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RecipeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecipeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Recipe(123);
        entity.basicNutritionData = new RecipeBasicNutritionData(null, 0, 0, 0, 0);
        entity.totalGramsWeight = 0;
        entity.recipeSections = [];
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
        const entity = new Recipe();
        entity.basicNutritionData = new RecipeBasicNutritionData(null, 0, 0, 0, 0);
        entity.totalGramsWeight = 0;
        entity.recipeSections = [];
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
