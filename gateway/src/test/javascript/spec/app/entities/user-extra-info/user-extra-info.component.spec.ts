/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GatewayTestModule } from '../../../test.module';
import { UserExtraInfoComponent } from 'app/entities/user-extra-info/user-extra-info.component';
import { UserExtraInfoService } from 'app/entities/user-extra-info/user-extra-info.service';
import { UserExtraInfo } from 'app/shared/model/user-extra-info.model';

describe('Component Tests', () => {
  describe('UserExtraInfo Management Component', () => {
    let comp: UserExtraInfoComponent;
    let fixture: ComponentFixture<UserExtraInfoComponent>;
    let service: UserExtraInfoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [UserExtraInfoComponent],
        providers: []
      })
        .overrideTemplate(UserExtraInfoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(UserExtraInfoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(UserExtraInfoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new UserExtraInfo(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.userExtraInfos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
