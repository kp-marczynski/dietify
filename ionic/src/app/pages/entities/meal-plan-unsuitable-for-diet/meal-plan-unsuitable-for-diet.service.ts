import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MealPlanUnsuitableForDiet } from './meal-plan-unsuitable-for-diet.model';

@Injectable({ providedIn: 'root'})
export class MealPlanUnsuitableForDietService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/mealplans/api') + '/meal-plan-unsuitable-for-diets';

    constructor(protected http: HttpClient) { }

    create(mealPlanUnsuitableForDiet: MealPlanUnsuitableForDiet): Observable<HttpResponse<MealPlanUnsuitableForDiet>> {
        return this.http.post<MealPlanUnsuitableForDiet>(this.resourceUrl, mealPlanUnsuitableForDiet, { observe: 'response'});
    }

    update(mealPlanUnsuitableForDiet: MealPlanUnsuitableForDiet): Observable<HttpResponse<MealPlanUnsuitableForDiet>> {
        return this.http.put(this.resourceUrl, mealPlanUnsuitableForDiet, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MealPlanUnsuitableForDiet>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MealPlanUnsuitableForDiet[]>> {
        const options = createRequestOption(req);
        return this.http.get<MealPlanUnsuitableForDiet[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
