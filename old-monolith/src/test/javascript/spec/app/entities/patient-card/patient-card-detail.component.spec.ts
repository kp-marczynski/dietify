/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { PatientCardDetailComponent } from 'app/entities/patient-card/patient-card-detail.component';
import { PatientCard } from 'app/shared/model/patient-card.model';

describe('Component Tests', () => {
    describe('PatientCard Management Detail Component', () => {
        let comp: PatientCardDetailComponent;
        let fixture: ComponentFixture<PatientCardDetailComponent>;
        const route = ({ data: of({ patientCard: new PatientCard(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [PatientCardDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(PatientCardDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PatientCardDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.patientCard).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
