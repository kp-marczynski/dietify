import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { OwnedKitchenAppliance } from './owned-kitchen-appliance.model';

@Injectable({ providedIn: 'root'})
export class OwnedKitchenApplianceService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/appointments/api') + '/owned-kitchen-appliances';

    constructor(protected http: HttpClient) { }

    create(ownedKitchenAppliance: OwnedKitchenAppliance): Observable<HttpResponse<OwnedKitchenAppliance>> {
        return this.http.post<OwnedKitchenAppliance>(this.resourceUrl, ownedKitchenAppliance, { observe: 'response'});
    }

    update(ownedKitchenAppliance: OwnedKitchenAppliance): Observable<HttpResponse<OwnedKitchenAppliance>> {
        return this.http.put(this.resourceUrl, ownedKitchenAppliance, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<OwnedKitchenAppliance>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<OwnedKitchenAppliance[]>> {
        const options = createRequestOption(req);
        return this.http.get<OwnedKitchenAppliance[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
