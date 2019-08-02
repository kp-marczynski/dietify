import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { KitchenAppliance } from './kitchen-appliance.model';

@Injectable({ providedIn: 'root'})
export class KitchenApplianceService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/kitchen-appliances';

    constructor(protected http: HttpClient) { }

    create(kitchenAppliance: KitchenAppliance): Observable<HttpResponse<KitchenAppliance>> {
        return this.http.post<KitchenAppliance>(this.resourceUrl, kitchenAppliance, { observe: 'response'});
    }

    update(kitchenAppliance: KitchenAppliance): Observable<HttpResponse<KitchenAppliance>> {
        return this.http.put(this.resourceUrl, kitchenAppliance, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<KitchenAppliance>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<KitchenAppliance[]>> {
        const options = createRequestOption(req);
        return this.http.get<KitchenAppliance[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
