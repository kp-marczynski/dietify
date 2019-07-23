/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { MealProductUpdateComponent } from 'app/entities/mealplans/meal-product/meal-product-update.component';
import { MealProductService } from 'app/entities/mealplans/meal-product/meal-product.service';
import { MealProduct } from 'app/shared/model/mealplans/meal-product.model';

describe('Component Tests', () => {
  describe('MealProduct Management Update Component', () => {
    let comp: MealProductUpdateComponent;
    let fixture: ComponentFixture<MealProductUpdateComponent>;
    let service: MealProductService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [MealProductUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(MealProductUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MealProductUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MealProductService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MealProduct(123);
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
        const entity = new MealProduct();
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
