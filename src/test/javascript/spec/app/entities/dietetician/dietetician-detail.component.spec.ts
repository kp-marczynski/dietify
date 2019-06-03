/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { DieteticianDetailComponent } from 'app/entities/dietetician/dietetician-detail.component';
import { Dietetician } from 'app/shared/model/dietetician.model';

describe('Component Tests', () => {
    describe('Dietetician Management Detail Component', () => {
        let comp: DieteticianDetailComponent;
        let fixture: ComponentFixture<DieteticianDetailComponent>;
        const route = ({ data: of({ dietetician: new Dietetician(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [DieteticianDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DieteticianDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DieteticianDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dietetician).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
