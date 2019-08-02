import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { RecipeUnsuitableForDiet } from './recipe-unsuitable-for-diet.model';

@Injectable({ providedIn: 'root'})
export class RecipeUnsuitableForDietService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/recipes/api') + '/recipe-unsuitable-for-diets';

    constructor(protected http: HttpClient) { }

    create(recipeUnsuitableForDiet: RecipeUnsuitableForDiet): Observable<HttpResponse<RecipeUnsuitableForDiet>> {
        return this.http.post<RecipeUnsuitableForDiet>(this.resourceUrl, recipeUnsuitableForDiet, { observe: 'response'});
    }

    update(recipeUnsuitableForDiet: RecipeUnsuitableForDiet): Observable<HttpResponse<RecipeUnsuitableForDiet>> {
        return this.http.put(this.resourceUrl, recipeUnsuitableForDiet, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<RecipeUnsuitableForDiet>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<RecipeUnsuitableForDiet[]>> {
        const options = createRequestOption(req);
        return this.http.get<RecipeUnsuitableForDiet[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
