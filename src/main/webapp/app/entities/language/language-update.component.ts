import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ILanguage } from 'app/shared/model/language.model';
import { LanguageService } from './language.service';

@Component({
    selector: 'jhi-language-update',
    templateUrl: './language-update.component.html'
})
export class LanguageUpdateComponent implements OnInit {
    language: ILanguage;
    isSaving: boolean;

    constructor(protected languageService: LanguageService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ language }) => {
            this.language = language;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.language.id !== undefined) {
            this.subscribeToSaveResponse(this.languageService.update(this.language));
        } else {
            this.subscribeToSaveResponse(this.languageService.create(this.language));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ILanguage>>) {
        result.subscribe((res: HttpResponse<ILanguage>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
