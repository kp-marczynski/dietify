/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { PreparationStepUpdateComponent } from 'app/entities/recipes/preparation-step/preparation-step-update.component';
import { PreparationStepService } from 'app/entities/recipes/preparation-step/preparation-step.service';
import { PreparationStep } from 'app/shared/model/recipes/preparation-step.model';

describe('Component Tests', () => {
  describe('PreparationStep Management Update Component', () => {
    let comp: PreparationStepUpdateComponent;
    let fixture: ComponentFixture<PreparationStepUpdateComponent>;
    let service: PreparationStepService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [PreparationStepUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(PreparationStepUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PreparationStepUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PreparationStepService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new PreparationStep(123);
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
        const entity = new PreparationStep();
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
