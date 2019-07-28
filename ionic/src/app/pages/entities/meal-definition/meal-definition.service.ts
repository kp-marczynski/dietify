import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MealDefinition } from './meal-definition.model';

@Injectable({ providedIn: 'root'})
export class MealDefinitionService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/mealplans/api') + '/meal-definitions';

    constructor(protected http: HttpClient) { }

    create(mealDefinition: MealDefinition): Observable<HttpResponse<MealDefinition>> {
        return this.http.post<MealDefinition>(this.resourceUrl, mealDefinition, { observe: 'response'});
    }

    update(mealDefinition: MealDefinition): Observable<HttpResponse<MealDefinition>> {
        return this.http.put(this.resourceUrl, mealDefinition, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MealDefinition>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MealDefinition[]>> {
        const options = createRequestOption(req);
        return this.http.get<MealDefinition[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
