import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { KitchenApplianceTranslation } from './kitchen-appliance-translation.model';

@Injectable({ providedIn: 'root'})
export class KitchenApplianceTranslationService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/kitchen-appliance-translations';

    constructor(protected http: HttpClient) { }

    create(kitchenApplianceTranslation: KitchenApplianceTranslation): Observable<HttpResponse<KitchenApplianceTranslation>> {
        return this.http.post<KitchenApplianceTranslation>(this.resourceUrl, kitchenApplianceTranslation, { observe: 'response'});
    }

    update(kitchenApplianceTranslation: KitchenApplianceTranslation): Observable<HttpResponse<KitchenApplianceTranslation>> {
        return this.http.put(this.resourceUrl, kitchenApplianceTranslation, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<KitchenApplianceTranslation>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<KitchenApplianceTranslation[]>> {
        const options = createRequestOption(req);
        return this.http.get<KitchenApplianceTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
