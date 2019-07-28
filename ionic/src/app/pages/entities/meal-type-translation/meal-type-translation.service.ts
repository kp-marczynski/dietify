import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MealTypeTranslation } from './meal-type-translation.model';

@Injectable({ providedIn: 'root'})
export class MealTypeTranslationService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/meal-type-translations';

    constructor(protected http: HttpClient) { }

    create(mealTypeTranslation: MealTypeTranslation): Observable<HttpResponse<MealTypeTranslation>> {
        return this.http.post<MealTypeTranslation>(this.resourceUrl, mealTypeTranslation, { observe: 'response'});
    }

    update(mealTypeTranslation: MealTypeTranslation): Observable<HttpResponse<MealTypeTranslation>> {
        return this.http.put(this.resourceUrl, mealTypeTranslation, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MealTypeTranslation>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MealTypeTranslation[]>> {
        const options = createRequestOption(req);
        return this.http.get<MealTypeTranslation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
