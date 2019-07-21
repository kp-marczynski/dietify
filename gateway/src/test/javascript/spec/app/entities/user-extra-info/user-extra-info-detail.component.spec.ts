/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GatewayTestModule } from '../../../test.module';
import { UserExtraInfoDetailComponent } from 'app/entities/user-extra-info/user-extra-info-detail.component';
import { UserExtraInfo } from 'app/shared/model/user-extra-info.model';

describe('Component Tests', () => {
  describe('UserExtraInfo Management Detail Component', () => {
    let comp: UserExtraInfoDetailComponent;
    let fixture: ComponentFixture<UserExtraInfoDetailComponent>;
    const route = ({ data: of({ userExtraInfo: new UserExtraInfo(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UserExtraInfoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(UserExtraInfoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(UserExtraInfoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.userExtraInfo).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
