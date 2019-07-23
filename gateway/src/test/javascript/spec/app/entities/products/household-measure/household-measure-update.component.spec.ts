/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { HouseholdMeasureUpdateComponent } from 'app/entities/products/household-measure/household-measure-update.component';
import { HouseholdMeasureService } from 'app/entities/products/household-measure/household-measure.service';
import { HouseholdMeasure } from 'app/shared/model/products/household-measure.model';

describe('Component Tests', () => {
  describe('HouseholdMeasure Management Update Component', () => {
    let comp: HouseholdMeasureUpdateComponent;
    let fixture: ComponentFixture<HouseholdMeasureUpdateComponent>;
    let service: HouseholdMeasureService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [HouseholdMeasureUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HouseholdMeasureUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HouseholdMeasureUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HouseholdMeasureService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HouseholdMeasure(123);
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
        const entity = new HouseholdMeasure();
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
