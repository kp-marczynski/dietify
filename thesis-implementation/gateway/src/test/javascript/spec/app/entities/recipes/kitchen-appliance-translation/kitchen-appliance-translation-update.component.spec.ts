/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { KitchenApplianceTranslationUpdateComponent } from 'app/entities/recipes/kitchen-appliance-translation/kitchen-appliance-translation-update.component';
import { KitchenApplianceTranslationService } from 'app/entities/recipes/kitchen-appliance-translation/kitchen-appliance-translation.service';
import { KitchenApplianceTranslation } from 'app/shared/model/recipes/kitchen-appliance-translation.model';

describe('Component Tests', () => {
  describe('KitchenApplianceTranslation Management Update Component', () => {
    let comp: KitchenApplianceTranslationUpdateComponent;
    let fixture: ComponentFixture<KitchenApplianceTranslationUpdateComponent>;
    let service: KitchenApplianceTranslationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [KitchenApplianceTranslationUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(KitchenApplianceTranslationUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(KitchenApplianceTranslationUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(KitchenApplianceTranslationService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new KitchenApplianceTranslation(123);
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
        const entity = new KitchenApplianceTranslation();
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
