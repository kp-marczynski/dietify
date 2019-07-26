import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { CustomNutritionalInterviewQuestion } from './custom-nutritional-interview-question.model';

@Injectable({ providedIn: 'root'})
export class CustomNutritionalInterviewQuestionService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/appointments/api') + '/custom-nutritional-interview-questions';

    constructor(protected http: HttpClient) { }

    create(customNutritionalInterviewQuestion: CustomNutritionalInterviewQuestion):
        Observable<HttpResponse<CustomNutritionalInterviewQuestion>> {
        return this.http.post<CustomNutritionalInterviewQuestion>(this.resourceUrl, customNutritionalInterviewQuestion, { observe: 'response'});
    }

    update(customNutritionalInterviewQuestion: CustomNutritionalInterviewQuestion):
        Observable<HttpResponse<CustomNutritionalInterviewQuestion>> {
        return this.http.put(this.resourceUrl, customNutritionalInterviewQuestion, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<CustomNutritionalInterviewQuestion>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<CustomNutritionalInterviewQuestion[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomNutritionalInterviewQuestion[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
