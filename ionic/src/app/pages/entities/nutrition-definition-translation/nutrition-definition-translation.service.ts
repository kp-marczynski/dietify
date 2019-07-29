import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { NutritionDefinitionTranslation } from './nutrition-definition-translation.model';

@Injectable({ providedIn: 'root'})
export class NutritionDefinitionTranslationService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/products/api') + '/nutrition-definition-translations';

    constructor(protected http: HttpClient) { }

    create(nutritionDefinitionTranslation: NutritionDefinitionTranslation): Observable<HttpResponse<NutritionDefinitionTranslation>> {
        return this.http.post<NutritionDefinitionTranslation>(this.resourceUrl, nutritionDefinitionTranslation, { observe: 'response'});
    }

    update(nutritionDefinitionTranslation: NutritionDefinitionTranslation): Observable<HttpResponse<NutritionDefinitionTranslation>> {
        return this.http.put(this.resourceUrl, nutritionDefinitionTranslation, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<NutritionDefinitionTranslation>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<NutritionDefinitionTranslation[]>> {
        const options = createRequestOption(req);
        return this.http.get<NutritionDefinitionTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
