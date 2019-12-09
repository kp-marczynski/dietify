import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ILandingPageCard, LandingPageCard } from 'app/shared/model/landing-page-card.model';
import { LandingPageCardService } from './landing-page-card.service';

@Component({
  selector: 'jhi-landing-page-card-update',
  templateUrl: './landing-page-card-update.component.html'
})
export class LandingPageCardUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    ordinalNumber: [null, [Validators.required, Validators.min(1)]],
    htmlContent: [null, [Validators.required]],
    cardImage: [],
    cardImageContentType: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected landingPageCardService: LandingPageCardService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ landingPageCard }) => {
      this.updateForm(landingPageCard);
    });
  }

  updateForm(landingPageCard: ILandingPageCard) {
    this.editForm.patchValue({
      id: landingPageCard.id,
      ordinalNumber: landingPageCard.ordinalNumber,
      htmlContent: landingPageCard.htmlContent,
      cardImage: landingPageCard.cardImage,
      cardImageContentType: landingPageCard.cardImageContentType
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        if (isImage && !/^image\//.test(file.type)) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      () => console.log('blob added'), // sucess
      this.onError
    );
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string) {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const landingPageCard = this.createFromForm();
    if (landingPageCard.id !== undefined) {
      this.subscribeToSaveResponse(this.landingPageCardService.update(landingPageCard));
    } else {
      this.subscribeToSaveResponse(this.landingPageCardService.create(landingPageCard));
    }
  }

  private createFromForm(): ILandingPageCard {
    return {
      ...new LandingPageCard(),
      id: this.editForm.get(['id']).value,
      ordinalNumber: this.editForm.get(['ordinalNumber']).value,
      htmlContent: this.editForm.get(['htmlContent']).value,
      cardImageContentType: this.editForm.get(['cardImageContentType']).value,
      cardImage: this.editForm.get(['cardImage']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILandingPageCard>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
