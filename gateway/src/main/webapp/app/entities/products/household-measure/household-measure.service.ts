import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IHouseholdMeasure } from 'app/shared/model/products/household-measure.model';

type EntityResponseType = HttpResponse<IHouseholdMeasure>;
type EntityArrayResponseType = HttpResponse<IHouseholdMeasure[]>;

@Injectable({ providedIn: 'root' })
export class HouseholdMeasureService {
  public resourceUrl = SERVER_API_URL + 'services/products/api/household-measures';
  public resourceSearchUrl = SERVER_API_URL + 'services/products/api/_search/household-measures';

  constructor(protected http: HttpClient) {}

  create(householdMeasure: IHouseholdMeasure): Observable<EntityResponseType> {
    return this.http.post<IHouseholdMeasure>(this.resourceUrl, householdMeasure, { observe: 'response' });
  }

  update(householdMeasure: IHouseholdMeasure): Observable<EntityResponseType> {
    return this.http.put<IHouseholdMeasure>(this.resourceUrl, householdMeasure, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHouseholdMeasure>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHouseholdMeasure[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHouseholdMeasure[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
