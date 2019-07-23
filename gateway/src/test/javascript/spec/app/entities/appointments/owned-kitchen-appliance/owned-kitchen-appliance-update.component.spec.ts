/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { OwnedKitchenApplianceUpdateComponent } from 'app/entities/appointments/owned-kitchen-appliance/owned-kitchen-appliance-update.component';
import { OwnedKitchenApplianceService } from 'app/entities/appointments/owned-kitchen-appliance/owned-kitchen-appliance.service';
import { OwnedKitchenAppliance } from 'app/shared/model/appointments/owned-kitchen-appliance.model';

describe('Component Tests', () => {
  describe('OwnedKitchenAppliance Management Update Component', () => {
    let comp: OwnedKitchenApplianceUpdateComponent;
    let fixture: ComponentFixture<OwnedKitchenApplianceUpdateComponent>;
    let service: OwnedKitchenApplianceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OwnedKitchenApplianceUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(OwnedKitchenApplianceUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OwnedKitchenApplianceUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OwnedKitchenApplianceService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OwnedKitchenAppliance(123);
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
        const entity = new OwnedKitchenAppliance();
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
