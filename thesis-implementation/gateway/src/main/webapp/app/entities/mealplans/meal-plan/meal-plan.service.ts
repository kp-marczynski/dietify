import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealPlan } from 'app/shared/model/mealplans/meal-plan.model';

type EntityResponseType = HttpResponse<IMealPlan>;
type EntityArrayResponseType = HttpResponse<IMealPlan[]>;

@Injectable({ providedIn: 'root' })
export class MealPlanService {
  public resourceUrl = SERVER_API_URL + 'services/mealplans/api/meal-plans';
  public resourceSearchUrl = SERVER_API_URL + 'services/mealplans/api/_search/meal-plans';

  constructor(protected http: HttpClient) {}

  create(mealPlan: IMealPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mealPlan);
    return this.http
      .post<IMealPlan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(mealPlan: IMealPlan): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(mealPlan);
    return this.http
      .put<IMealPlan>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMealPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMealPlan[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMealPlan[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(mealPlan: IMealPlan): IMealPlan {
    const copy: IMealPlan = Object.assign({}, mealPlan, {
      creationTimestamp:
        mealPlan.creationTimestamp != null && mealPlan.creationTimestamp.isValid() ? mealPlan.creationTimestamp.toJSON() : null,
      lastEditTimestamp:
        mealPlan.lastEditTimestamp != null && mealPlan.lastEditTimestamp.isValid() ? mealPlan.lastEditTimestamp.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationTimestamp = res.body.creationTimestamp != null ? moment(res.body.creationTimestamp) : null;
      res.body.lastEditTimestamp = res.body.lastEditTimestamp != null ? moment(res.body.lastEditTimestamp) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((mealPlan: IMealPlan) => {
        mealPlan.creationTimestamp = mealPlan.creationTimestamp != null ? moment(mealPlan.creationTimestamp) : null;
        mealPlan.lastEditTimestamp = mealPlan.lastEditTimestamp != null ? moment(mealPlan.lastEditTimestamp) : null;
      });
    }
    return res;
  }
}
