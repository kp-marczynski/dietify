import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { DietTypeTranslation } from './diet-type-translation.model';

@Injectable({ providedIn: 'root'})
export class DietTypeTranslationService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/products/api') + '/diet-type-translations';

    constructor(protected http: HttpClient) { }

    create(dietTypeTranslation: DietTypeTranslation): Observable<HttpResponse<DietTypeTranslation>> {
        return this.http.post<DietTypeTranslation>(this.resourceUrl, dietTypeTranslation, { observe: 'response'});
    }

    update(dietTypeTranslation: DietTypeTranslation): Observable<HttpResponse<DietTypeTranslation>> {
        return this.http.put(this.resourceUrl, dietTypeTranslation, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<DietTypeTranslation>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<DietTypeTranslation[]>> {
        const options = createRequestOption(req);
        return this.http.get<DietTypeTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
