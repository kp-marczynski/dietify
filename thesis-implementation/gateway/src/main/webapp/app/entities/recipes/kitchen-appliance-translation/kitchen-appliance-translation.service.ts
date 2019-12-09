import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKitchenApplianceTranslation } from 'app/shared/model/recipes/kitchen-appliance-translation.model';

type EntityResponseType = HttpResponse<IKitchenApplianceTranslation>;
type EntityArrayResponseType = HttpResponse<IKitchenApplianceTranslation[]>;

@Injectable({ providedIn: 'root' })
export class KitchenApplianceTranslationService {
  public resourceUrl = SERVER_API_URL + 'services/recipes/api/kitchen-appliance-translations';
  public resourceSearchUrl = SERVER_API_URL + 'services/recipes/api/_search/kitchen-appliance-translations';

  constructor(protected http: HttpClient) {}

  create(kitchenApplianceTranslation: IKitchenApplianceTranslation): Observable<EntityResponseType> {
    return this.http.post<IKitchenApplianceTranslation>(this.resourceUrl, kitchenApplianceTranslation, { observe: 'response' });
  }

  update(kitchenApplianceTranslation: IKitchenApplianceTranslation): Observable<EntityResponseType> {
    return this.http.put<IKitchenApplianceTranslation>(this.resourceUrl, kitchenApplianceTranslation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKitchenApplianceTranslation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKitchenApplianceTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKitchenApplianceTranslation[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
