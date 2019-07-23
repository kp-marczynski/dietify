/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { NutritionDataUpdateComponent } from 'app/entities/products/nutrition-data/nutrition-data-update.component';
import { NutritionDataService } from 'app/entities/products/nutrition-data/nutrition-data.service';
import { NutritionData } from 'app/shared/model/products/nutrition-data.model';

describe('Component Tests', () => {
  describe('NutritionData Management Update Component', () => {
    let comp: NutritionDataUpdateComponent;
    let fixture: ComponentFixture<NutritionDataUpdateComponent>;
    let service: NutritionDataService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [NutritionDataUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(NutritionDataUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(NutritionDataUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(NutritionDataService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new NutritionData(123);
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
        const entity = new NutritionData();
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
