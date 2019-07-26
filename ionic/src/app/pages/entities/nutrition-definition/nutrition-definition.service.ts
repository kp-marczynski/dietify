import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { NutritionDefinition } from './nutrition-definition.model';

@Injectable({ providedIn: 'root'})
export class NutritionDefinitionService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/products/api') + '/nutrition-definitions';

    constructor(protected http: HttpClient) { }

    create(nutritionDefinition: NutritionDefinition): Observable<HttpResponse<NutritionDefinition>> {
        return this.http.post<NutritionDefinition>(this.resourceUrl, nutritionDefinition, { observe: 'response'});
    }

    update(nutritionDefinition: NutritionDefinition): Observable<HttpResponse<NutritionDefinition>> {
        return this.http.put(this.resourceUrl, nutritionDefinition, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<NutritionDefinition>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<NutritionDefinition[]>> {
        const options = createRequestOption(req);
        return this.http.get<NutritionDefinition[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
