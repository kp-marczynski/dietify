import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IKitchenAppliance } from 'app/shared/model/recipes/kitchen-appliance.model';

type EntityResponseType = HttpResponse<IKitchenAppliance>;
type EntityArrayResponseType = HttpResponse<IKitchenAppliance[]>;

@Injectable({ providedIn: 'root' })
export class KitchenApplianceService {
  public resourceUrl = SERVER_API_URL + 'services/recipes/api/kitchen-appliances';
  public resourceSearchUrl = SERVER_API_URL + 'services/recipes/api/_search/kitchen-appliances';

  constructor(protected http: HttpClient) {}

  create(kitchenAppliance: IKitchenAppliance): Observable<EntityResponseType> {
    return this.http.post<IKitchenAppliance>(this.resourceUrl, kitchenAppliance, { observe: 'response' });
  }

  update(kitchenAppliance: IKitchenAppliance): Observable<EntityResponseType> {
    return this.http.put<IKitchenAppliance>(this.resourceUrl, kitchenAppliance, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IKitchenAppliance>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKitchenAppliance[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IKitchenAppliance[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
