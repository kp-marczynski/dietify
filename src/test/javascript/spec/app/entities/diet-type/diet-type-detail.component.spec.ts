/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DietifyTestModule } from '../../../test.module';
import { DietTypeDetailComponent } from 'app/entities/diet-type/diet-type-detail.component';
import { DietType } from 'app/shared/model/diet-type.model';

describe('Component Tests', () => {
    describe('DietType Management Detail Component', () => {
        let comp: DietTypeDetailComponent;
        let fixture: ComponentFixture<DietTypeDetailComponent>;
        const route = ({ data: of({ dietType: new DietType(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [DietTypeDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(DietTypeDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DietTypeDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.dietType).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
