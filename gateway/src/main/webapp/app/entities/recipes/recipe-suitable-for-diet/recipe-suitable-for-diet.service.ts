import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IRecipeSuitableForDiet } from 'app/shared/model/recipes/recipe-suitable-for-diet.model';

type EntityResponseType = HttpResponse<IRecipeSuitableForDiet>;
type EntityArrayResponseType = HttpResponse<IRecipeSuitableForDiet[]>;

@Injectable({ providedIn: 'root' })
export class RecipeSuitableForDietService {
  public resourceUrl = SERVER_API_URL + 'services/recipes/api/recipe-suitable-for-diets';
  public resourceSearchUrl = SERVER_API_URL + 'services/recipes/api/_search/recipe-suitable-for-diets';

  constructor(protected http: HttpClient) {}

  create(recipeSuitableForDiet: IRecipeSuitableForDiet): Observable<EntityResponseType> {
    return this.http.post<IRecipeSuitableForDiet>(this.resourceUrl, recipeSuitableForDiet, { observe: 'response' });
  }

  update(recipeSuitableForDiet: IRecipeSuitableForDiet): Observable<EntityResponseType> {
    return this.http.put<IRecipeSuitableForDiet>(this.resourceUrl, recipeSuitableForDiet, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IRecipeSuitableForDiet>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecipeSuitableForDiet[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IRecipeSuitableForDiet[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
