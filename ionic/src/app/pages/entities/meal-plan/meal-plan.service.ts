import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MealPlan } from './meal-plan.model';

@Injectable({ providedIn: 'root'})
export class MealPlanService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/mealplans/api') + '/meal-plans';

    constructor(protected http: HttpClient) { }

    create(mealPlan: MealPlan): Observable<HttpResponse<MealPlan>> {
        return this.http.post<MealPlan>(this.resourceUrl, mealPlan, { observe: 'response'});
    }

    update(mealPlan: MealPlan): Observable<HttpResponse<MealPlan>> {
        return this.http.put(this.resourceUrl, mealPlan, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MealPlan>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MealPlan[]>> {
        const options = createRequestOption(req);
        return this.http.get<MealPlan[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
