/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../../test.module';
import { KitchenApplianceDetailComponent } from 'app/entities/recipes/kitchen-appliance/kitchen-appliance-detail.component';
import { KitchenAppliance } from 'app/shared/model/recipes/kitchen-appliance.model';

describe('Component Tests', () => {
  describe('KitchenAppliance Management Detail Component', () => {
    let comp: KitchenApplianceDetailComponent;
    let fixture: ComponentFixture<KitchenApplianceDetailComponent>;
    const route = ({ data: of({ kitchenAppliance: new KitchenAppliance(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [KitchenApplianceDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(KitchenApplianceDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(KitchenApplianceDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.kitchenAppliance).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
