/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { LandingPageCardUpdateComponent } from 'app/entities/landing-page-card/landing-page-card-update.component';
import { LandingPageCardService } from 'app/entities/landing-page-card/landing-page-card.service';
import { LandingPageCard } from 'app/shared/model/landing-page-card.model';

describe('Component Tests', () => {
  describe('LandingPageCard Management Update Component', () => {
    let comp: LandingPageCardUpdateComponent;
    let fixture: ComponentFixture<LandingPageCardUpdateComponent>;
    let service: LandingPageCardService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [LandingPageCardUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(LandingPageCardUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(LandingPageCardUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(LandingPageCardService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new LandingPageCard(123);
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
        const entity = new LandingPageCard();
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
