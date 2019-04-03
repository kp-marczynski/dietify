/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DietifyTestModule } from '../../../test.module';
import { KitchenApplianceComponent } from 'app/entities/kitchen-appliance/kitchen-appliance.component';
import { KitchenApplianceService } from 'app/entities/kitchen-appliance/kitchen-appliance.service';
import { KitchenAppliance } from 'app/shared/model/kitchen-appliance.model';

describe('Component Tests', () => {
    describe('KitchenAppliance Management Component', () => {
        let comp: KitchenApplianceComponent;
        let fixture: ComponentFixture<KitchenApplianceComponent>;
        let service: KitchenApplianceService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [DietifyTestModule],
                declarations: [KitchenApplianceComponent],
                providers: []
            })
                .overrideTemplate(KitchenApplianceComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(KitchenApplianceComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KitchenApplianceService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new KitchenAppliance(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.kitchenAppliances[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
