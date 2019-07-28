import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';
import { createRequestOption } from 'src/app/shared';
import { CustomNutritionalInterviewQuestionTemplate } from './custom-nutritional-interview-question-template.model';

@Injectable({ providedIn: 'root'})
export class CustomNutritionalInterviewQuestionTemplateService {
    private resourceUrl = ApiService.API_URL.replace('api', 'service/appointments/api') + '/custom-nutritional-interview-question-templates';

    constructor(protected http: HttpClient) { }

    create(customNutritionalInterviewQuestionTemplate: CustomNutritionalInterviewQuestionTemplate):
        Observable<HttpResponse<CustomNutritionalInterviewQuestionTemplate>> {
        return this.http.post<CustomNutritionalInterviewQuestionTemplate>(this.resourceUrl, customNutritionalInterviewQuestionTemplate, { observe: 'response'});
    }

    update(customNutritionalInterviewQuestionTemplate: CustomNutritionalInterviewQuestionTemplate):
        Observable<HttpResponse<CustomNutritionalInterviewQuestionTemplate>> {
        return this.http.put(this.resourceUrl, customNutritionalInterviewQuestionTemplate, { observe: 'response'});
    }

    find(id: number): Observable<HttpResponse<CustomNutritionalInterviewQuestionTemplate>> {
        return this.http.get(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    query(req?: any): Observable<HttpResponse<CustomNutritionalInterviewQuestionTemplate[]>> {
        const options = createRequestOption(req);
        return this.http.get<CustomNutritionalInterviewQuestionTemplate[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }
}
