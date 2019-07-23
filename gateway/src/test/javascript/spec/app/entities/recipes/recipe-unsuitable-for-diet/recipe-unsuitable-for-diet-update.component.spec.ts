/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { RecipeUnsuitableForDietUpdateComponent } from 'app/entities/recipes/recipe-unsuitable-for-diet/recipe-unsuitable-for-diet-update.component';
import { RecipeUnsuitableForDietService } from 'app/entities/recipes/recipe-unsuitable-for-diet/recipe-unsuitable-for-diet.service';
import { RecipeUnsuitableForDiet } from 'app/shared/model/recipes/recipe-unsuitable-for-diet.model';

describe('Component Tests', () => {
  describe('RecipeUnsuitableForDiet Management Update Component', () => {
    let comp: RecipeUnsuitableForDietUpdateComponent;
    let fixture: ComponentFixture<RecipeUnsuitableForDietUpdateComponent>;
    let service: RecipeUnsuitableForDietService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [RecipeUnsuitableForDietUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(RecipeUnsuitableForDietUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RecipeUnsuitableForDietUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RecipeUnsuitableForDietService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RecipeUnsuitableForDiet(123);
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
        const entity = new RecipeUnsuitableForDiet();
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
