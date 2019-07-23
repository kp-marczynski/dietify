/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { ProductBasicNutritionDataUpdateComponent } from 'app/entities/products/product-basic-nutrition-data/product-basic-nutrition-data-update.component';
import { ProductBasicNutritionDataService } from 'app/entities/products/product-basic-nutrition-data/product-basic-nutrition-data.service';
import { ProductBasicNutritionData } from 'app/shared/model/products/product-basic-nutrition-data.model';

describe('Component Tests', () => {
  describe('ProductBasicNutritionData Management Update Component', () => {
    let comp: ProductBasicNutritionDataUpdateComponent;
    let fixture: ComponentFixture<ProductBasicNutritionDataUpdateComponent>;
    let service: ProductBasicNutritionDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [ProductBasicNutritionDataUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductBasicNutritionDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductBasicNutritionDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductBasicNutritionDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductBasicNutritionData(123);
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
        const entity = new ProductBasicNutritionData();
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
