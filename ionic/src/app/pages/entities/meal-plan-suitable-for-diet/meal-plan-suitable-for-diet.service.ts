import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MealPlanSuitableForDiet } from './meal-plan-suitable-for-diet.model';

@Injectable({ providedIn: 'root'})
export class MealPlanSuitableForDietService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/mealplans/api') + '/meal-plan-suitable-for-diets';

    constructor(protected http: HttpClient) { }

    create(mealPlanSuitableForDiet: MealPlanSuitableForDiet): Observable<HttpResponse<MealPlanSuitableForDiet>> {
        return this.http.post<MealPlanSuitableForDiet>(this.resourceUrl, mealPlanSuitableForDiet, { observe: 'response'});
    }

    update(mealPlanSuitableForDiet: MealPlanSuitableForDiet): Observable<HttpResponse<MealPlanSuitableForDiet>> {
        return this.http.put(this.resourceUrl, mealPlanSuitableForDiet, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MealPlanSuitableForDiet>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MealPlanSuitableForDiet[]>> {
        const options = createRequestOption(req);
        return this.http.get<MealPlanSuitableForDiet[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
