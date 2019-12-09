/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PatientCardUpdateComponent } from 'app/entities/appointments/patient-card/patient-card-update.component';
import { PatientCardService } from 'app/entities/appointments/patient-card/patient-card.service';
import { PatientCard } from 'app/shared/model/appointments/patient-card.model';

describe('Component Tests', () => {
  describe('PatientCard Management Update Component', () => {
    let comp: PatientCardUpdateComponent;
    let fixture: ComponentFixture<PatientCardUpdateComponent>;
    let service: PatientCardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PatientCardUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PatientCardUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PatientCardUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PatientCardService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PatientCard(123);
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
        const entity = new PatientCard();
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
