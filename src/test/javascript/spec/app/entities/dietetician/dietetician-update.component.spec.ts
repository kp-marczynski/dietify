/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { DieteticianUpdateComponent } from 'app/entities/dietetician/dietetician-update.component';
import { DieteticianService } from 'app/entities/dietetician/dietetician.service';
import { Dietetician } from 'app/shared/model/dietetician.model';

describe('Component Tests', () => {
    describe('Dietetician Management Update Component', () => {
        let comp: DieteticianUpdateComponent;
        let fixture: ComponentFixture<DieteticianUpdateComponent>;
        let service: DieteticianService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [DieteticianUpdateComponent]
            })
                .overrideTemplate(DieteticianUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DieteticianUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DieteticianService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Dietetician(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dietetician = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Dietetician();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.dietetician = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
