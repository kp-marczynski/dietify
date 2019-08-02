import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { RecipeBasicNutritionData } from './recipe-basic-nutrition-data.model';

@Injectable({ providedIn: 'root'})
export class RecipeBasicNutritionDataService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/recipe-basic-nutrition-data';

    constructor(protected http: HttpClient) { }

    create(recipeBasicNutritionData: RecipeBasicNutritionData): Observable<HttpResponse<RecipeBasicNutritionData>> {
        return this.http.post<RecipeBasicNutritionData>(this.resourceUrl, recipeBasicNutritionData, { observe: 'response'});
    }

    update(recipeBasicNutritionData: RecipeBasicNutritionData): Observable<HttpResponse<RecipeBasicNutritionData>> {
        return this.http.put(this.resourceUrl, recipeBasicNutritionData, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<RecipeBasicNutritionData>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<RecipeBasicNutritionData[]>> {
        const options = createRequestOption(req);
        return this.http.get<RecipeBasicNutritionData[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
