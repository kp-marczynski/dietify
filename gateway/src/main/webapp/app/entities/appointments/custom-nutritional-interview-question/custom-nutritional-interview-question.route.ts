import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CustomNutritionalInterviewQuestion } from 'app/shared/model/appointments/custom-nutritional-interview-question.model';
import { CustomNutritionalInterviewQuestionService } from './custom-nutritional-interview-question.service';
import { CustomNutritionalInterviewQuestionComponent } from './custom-nutritional-interview-question.component';
import { CustomNutritionalInterviewQuestionDetailComponent } from './custom-nutritional-interview-question-detail.component';
import { CustomNutritionalInterviewQuestionUpdateComponent } from './custom-nutritional-interview-question-update.component';
import { CustomNutritionalInterviewQuestionDeletePopupComponent } from './custom-nutritional-interview-question-delete-dialog.component';
import { ICustomNutritionalInterviewQuestion } from 'app/shared/model/appointments/custom-nutritional-interview-question.model';

@Injectable({ providedIn: 'root' })
export class CustomNutritionalInterviewQuestionResolve implements Resolve<ICustomNutritionalInterviewQuestion> {
  constructor(private service: CustomNutritionalInterviewQuestionService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICustomNutritionalInterviewQuestion> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CustomNutritionalInterviewQuestion>) => response.ok),
        map(
          (customNutritionalInterviewQuestion: HttpResponse<CustomNutritionalInterviewQuestion>) => customNutritionalInterviewQuestion.body
        )
      );
    }
    return of(new CustomNutritionalInterviewQuestion());
  }
}

export const customNutritionalInterviewQuestionRoute: Routes = [
  {
    path: '',
    component: CustomNutritionalInterviewQuestionComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsCustomNutritionalInterviewQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CustomNutritionalInterviewQuestionDetailComponent,
    resolve: {
      customNutritionalInterviewQuestion: CustomNutritionalInterviewQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsCustomNutritionalInterviewQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CustomNutritionalInterviewQuestionUpdateComponent,
    resolve: {
      customNutritionalInterviewQuestion: CustomNutritionalInterviewQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsCustomNutritionalInterviewQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CustomNutritionalInterviewQuestionUpdateComponent,
    resolve: {
      customNutritionalInterviewQuestion: CustomNutritionalInterviewQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsCustomNutritionalInterviewQuestion.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const customNutritionalInterviewQuestionPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CustomNutritionalInterviewQuestionDeletePopupComponent,
    resolve: {
      customNutritionalInterviewQuestion: CustomNutritionalInterviewQuestionResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'gatewayApp.appointmentsCustomNutritionalInterviewQuestion.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
