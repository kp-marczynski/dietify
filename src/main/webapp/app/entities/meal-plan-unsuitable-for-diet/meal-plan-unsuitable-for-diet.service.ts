import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealPlanUnsuitableForDiet } from 'app/shared/model/meal-plan-unsuitable-for-diet.model';

type EntityResponseType = HttpResponse<IMealPlanUnsuitableForDiet>;
type EntityArrayResponseType = HttpResponse<IMealPlanUnsuitableForDiet[]>;

@Injectable({ providedIn: 'root' })
export class MealPlanUnsuitableForDietService {
    public resourceUrl = SERVER_API_URL + 'api/meal-plan-unsuitable-for-diets';

    constructor(protected http: HttpClient) {}

    create(mealPlanUnsuitableForDiet: IMealPlanUnsuitableForDiet): Observable<EntityResponseType> {
        return this.http.post<IMealPlanUnsuitableForDiet>(this.resourceUrl, mealPlanUnsuitableForDiet, { observe: 'response' });
    }

    update(mealPlanUnsuitableForDiet: IMealPlanUnsuitableForDiet): Observable<EntityResponseType> {
        return this.http.put<IMealPlanUnsuitableForDiet>(this.resourceUrl, mealPlanUnsuitableForDiet, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMealPlanUnsuitableForDiet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMealPlanUnsuitableForDiet[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
