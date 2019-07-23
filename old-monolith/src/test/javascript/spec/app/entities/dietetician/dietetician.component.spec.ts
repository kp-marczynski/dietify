/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { DieteticianComponent } from 'app/entities/dietetician/dietetician.component';
import { DieteticianService } from 'app/entities/dietetician/dietetician.service';
import { Dietetician } from 'app/shared/model/dietetician.model';

describe('Component Tests', () => {
    describe('Dietetician Management Component', () => {
        let comp: DieteticianComponent;
        let fixture: ComponentFixture<DieteticianComponent>;
        let service: DieteticianService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [DieteticianComponent],
                providers: []
            })
                .overrideTemplate(DieteticianComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(DieteticianComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DieteticianService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Dietetician(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.dieteticians[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
