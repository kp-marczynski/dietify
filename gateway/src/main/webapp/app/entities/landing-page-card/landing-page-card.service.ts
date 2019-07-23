import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ILandingPageCard } from 'app/shared/model/landing-page-card.model';

type EntityResponseType = HttpResponse<ILandingPageCard>;
type EntityArrayResponseType = HttpResponse<ILandingPageCard[]>;

@Injectable({ providedIn: 'root' })
export class LandingPageCardService {
  public resourceUrl = SERVER_API_URL + 'api/landing-page-cards';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/landing-page-cards';

  constructor(protected http: HttpClient) {}

  create(landingPageCard: ILandingPageCard): Observable<EntityResponseType> {
    return this.http.post<ILandingPageCard>(this.resourceUrl, landingPageCard, { observe: 'response' });
  }

  update(landingPageCard: ILandingPageCard): Observable<EntityResponseType> {
    return this.http.put<ILandingPageCard>(this.resourceUrl, landingPageCard, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ILandingPageCard>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILandingPageCard[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ILandingPageCard[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
