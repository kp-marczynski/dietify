import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOwnedKitchenAppliance } from 'app/shared/model/appointments/owned-kitchen-appliance.model';

type EntityResponseType = HttpResponse<IOwnedKitchenAppliance>;
type EntityArrayResponseType = HttpResponse<IOwnedKitchenAppliance[]>;

@Injectable({ providedIn: 'root' })
export class OwnedKitchenApplianceService {
  public resourceUrl = SERVER_API_URL + 'services/appointments/api/owned-kitchen-appliances';
  public resourceSearchUrl = SERVER_API_URL + 'services/appointments/api/_search/owned-kitchen-appliances';

  constructor(protected http: HttpClient) {}

  create(ownedKitchenAppliance: IOwnedKitchenAppliance): Observable<EntityResponseType> {
    return this.http.post<IOwnedKitchenAppliance>(this.resourceUrl, ownedKitchenAppliance, { observe: 'response' });
  }

  update(ownedKitchenAppliance: IOwnedKitchenAppliance): Observable<EntityResponseType> {
    return this.http.put<IOwnedKitchenAppliance>(this.resourceUrl, ownedKitchenAppliance, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOwnedKitchenAppliance>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOwnedKitchenAppliance[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOwnedKitchenAppliance[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
