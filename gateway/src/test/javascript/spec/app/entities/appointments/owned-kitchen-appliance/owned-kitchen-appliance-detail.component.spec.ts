/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { OwnedKitchenApplianceDetailComponent } from 'app/entities/appointments/owned-kitchen-appliance/owned-kitchen-appliance-detail.component';
import { OwnedKitchenAppliance } from 'app/shared/model/appointments/owned-kitchen-appliance.model';

describe('Component Tests', () => {
  describe('OwnedKitchenAppliance Management Detail Component', () => {
    let comp: OwnedKitchenApplianceDetailComponent;
    let fixture: ComponentFixture<OwnedKitchenApplianceDetailComponent>;
    const route = ({ data: of({ ownedKitchenAppliance: new OwnedKitchenAppliance(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OwnedKitchenApplianceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(OwnedKitchenApplianceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OwnedKitchenApplianceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.ownedKitchenAppliance).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
