/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { UserExtraInfoUpdateComponent } from 'app/entities/user-extra-info/user-extra-info-update.component';
import { UserExtraInfoService } from 'app/entities/user-extra-info/user-extra-info.service';
import { UserExtraInfo } from 'app/shared/model/user-extra-info.model';

describe('Component Tests', () => {
  describe('UserExtraInfo Management Update Component', () => {
    let comp: UserExtraInfoUpdateComponent;
    let fixture: ComponentFixture<UserExtraInfoUpdateComponent>;
    let service: UserExtraInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UserExtraInfoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(UserExtraInfoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserExtraInfoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserExtraInfoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new UserExtraInfo(123);
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
        const entity = new UserExtraInfo();
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
