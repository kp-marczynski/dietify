/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { DietTypeTranslationUpdateComponent } from 'app/entities/products/diet-type-translation/diet-type-translation-update.component';
import { DietTypeTranslationService } from 'app/entities/products/diet-type-translation/diet-type-translation.service';
import { DietTypeTranslation } from 'app/shared/model/products/diet-type-translation.model';

describe('Component Tests', () => {
  describe('DietTypeTranslation Management Update Component', () => {
    let comp: DietTypeTranslationUpdateComponent;
    let fixture: ComponentFixture<DietTypeTranslationUpdateComponent>;
    let service: DietTypeTranslationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DietTypeTranslationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DietTypeTranslationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DietTypeTranslationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DietTypeTranslationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DietTypeTranslation(123);
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
        const entity = new DietTypeTranslation();
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
