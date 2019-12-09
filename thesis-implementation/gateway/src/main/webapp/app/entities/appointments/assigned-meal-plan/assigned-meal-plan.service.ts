import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';

type EntityResponseType = HttpResponse<IAssignedMealPlan>;
type EntityArrayResponseType = HttpResponse<IAssignedMealPlan[]>;

@Injectable({ providedIn: 'root' })
export class AssignedMealPlanService {
  public resourceUrl = SERVER_API_URL + 'services/appointments/api/assigned-meal-plans';
  public resourceSearchUrl = SERVER_API_URL + 'services/appointments/api/_search/assigned-meal-plans';

  constructor(protected http: HttpClient) {}

  create(assignedMealPlan: IAssignedMealPlan): Observable<EntityResponseType> {
    return this.http.post<IAssignedMealPlan>(this.resourceUrl, assignedMealPlan, { observe: 'response' });
  }

  update(assignedMealPlan: IAssignedMealPlan): Observable<EntityResponseType> {
    return this.http.put<IAssignedMealPlan>(this.resourceUrl, assignedMealPlan, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAssignedMealPlan>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAssignedMealPlan[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAssignedMealPlan[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
