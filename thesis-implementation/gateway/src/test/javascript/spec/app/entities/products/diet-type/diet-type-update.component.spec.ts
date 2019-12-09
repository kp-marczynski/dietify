/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DietTypeUpdateComponent } from 'app/entities/products/diet-type/diet-type-update.component';
import { DietTypeService } from 'app/entities/products/diet-type/diet-type.service';
import { DietType } from 'app/shared/model/products/diet-type.model';

describe('Component Tests', () => {
  describe('DietType Management Update Component', () => {
    let comp: DietTypeUpdateComponent;
    let fixture: ComponentFixture<DietTypeUpdateComponent>;
    let service: DietTypeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DietTypeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DietTypeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DietTypeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DietTypeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DietType(123);
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
        const entity = new DietType();
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
