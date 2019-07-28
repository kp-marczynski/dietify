import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { MealRecipe } from './meal-recipe.model';

@Injectable({ providedIn: 'root'})
export class MealRecipeService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/mealplans/api') + '/meal-recipes';

    constructor(protected http: HttpClient) { }

    create(mealRecipe: MealRecipe): Observable<HttpResponse<MealRecipe>> {
        return this.http.post<MealRecipe>(this.resourceUrl, mealRecipe, { observe: 'response'});
    }

    update(mealRecipe: MealRecipe): Observable<HttpResponse<MealRecipe>> {
        return this.http.put(this.resourceUrl, mealRecipe, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<MealRecipe>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<MealRecipe[]>> {
        const options = createRequestOption(req);
        return this.http.get<MealRecipe[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
