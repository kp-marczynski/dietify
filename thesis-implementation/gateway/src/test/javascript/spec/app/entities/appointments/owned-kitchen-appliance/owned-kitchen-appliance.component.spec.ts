/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../../test.module';
import { OwnedKitchenApplianceComponent } from 'app/entities/appointments/owned-kitchen-appliance/owned-kitchen-appliance.component';
import { OwnedKitchenApplianceService } from 'app/entities/appointments/owned-kitchen-appliance/owned-kitchen-appliance.service';
import { OwnedKitchenAppliance } from 'app/shared/model/appointments/owned-kitchen-appliance.model';

describe('Component Tests', () => {
  describe('OwnedKitchenAppliance Management Component', () => {
    let comp: OwnedKitchenApplianceComponent;
    let fixture: ComponentFixture<OwnedKitchenApplianceComponent>;
    let service: OwnedKitchenApplianceService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [OwnedKitchenApplianceComponent],
        providers: []
      })
        .overrideTemplate(OwnedKitchenApplianceComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OwnedKitchenApplianceComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OwnedKitchenApplianceService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OwnedKitchenAppliance(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ownedKitchenAppliances[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
