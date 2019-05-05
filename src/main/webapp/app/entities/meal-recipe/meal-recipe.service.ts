import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMealRecipe } from 'app/shared/model/meal-recipe.model';

type EntityResponseType = HttpResponse<IMealRecipe>;
type EntityArrayResponseType = HttpResponse<IMealRecipe[]>;

@Injectable({ providedIn: 'root' })
export class MealRecipeService {
    public resourceUrl = SERVER_API_URL + 'api/meal-recipes';

    constructor(protected http: HttpClient) {}

    create(mealRecipe: IMealRecipe): Observable<EntityResponseType> {
        return this.http.post<IMealRecipe>(this.resourceUrl, mealRecipe, { observe: 'response' });
    }

    update(mealRecipe: IMealRecipe): Observable<EntityResponseType> {
        return this.http.put<IMealRecipe>(this.resourceUrl, mealRecipe, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMealRecipe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMealRecipe[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
