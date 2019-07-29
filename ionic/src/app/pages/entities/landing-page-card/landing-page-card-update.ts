import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LandingPageCard } from './landing-page-card.model';
import { LandingPageCardService } from './landing-page-card.service';

@Component({
    selector: 'page-landing-page-card-update',
    templateUrl: 'landing-page-card-update.html'
})
export class LandingPageCardUpdatePage implements OnInit {

    landingPageCard: LandingPageCard;
    @ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        ordinalNumber: [null, [Validators.required]],
        htmlContent: [null, [Validators.required]],
        cardImage: [null, []],
        cardImageContentType: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,

        private elementRef: ElementRef,
        private camera: Camera,
        private landingPageCardService: LandingPageCardService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

        // Set the Camera options
        this.cameraOptions = {
            quality: 100,
            targetWidth: 900,
            targetHeight: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            allowEdit: true,
            sourceType: 1
        };
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.landingPageCard = response.data;
            this.isNew = this.landingPageCard.id === null || this.landingPageCard.id === undefined;
        });
    }

    updateForm(landingPageCard: LandingPageCard) {
        this.form.patchValue({
            id: landingPageCard.id,
            ordinalNumber: landingPageCard.ordinalNumber,
            htmlContent: landingPageCard.htmlContent,
            cardImage: landingPageCard.cardImage,
            cardImageContentType: landingPageCard.cardImageContentType,
        });
    }

    save() {
        this.isSaving = true;
        const landingPageCard = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.landingPageCardService.update(landingPageCard));
        } else {
            this.subscribeToSaveResponse(this.landingPageCardService.create(landingPageCard));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<LandingPageCard>>) {
        result.subscribe((res: HttpResponse<LandingPageCard>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `LandingPageCard ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/landing-page-card');
    }

    previousState() {
        window.history.back();
    }

    async onError(error) {
        this.isSaving = false;
        console.error(error);
        const toast = await this.toastCtrl.create({message: 'Failed to load data', duration: 2000, position: 'middle'});
        toast.present();
    }

    private createFromForm(): LandingPageCard {
        return {
            ...new LandingPageCard(),
            id: this.form.get(['id']).value,
            ordinalNumber: this.form.get(['ordinalNumber']).value,
            htmlContent: this.form.get(['htmlContent']).value,
            cardImage: this.form.get(['cardImage']).value,
            cardImageContentType: this.form.get(['cardImageContentType']).value,
        };
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
        this.processWebImage(event, field);
    }

    getPicture(fieldName) {
        if (Camera.installed()) {
            this.camera.getPicture(this.cameraOptions).then((data) => {
                this.landingPageCard[fieldName] = data;
                this.landingPageCard[fieldName + 'ContentType'] = 'image/jpeg';
                this.form.patchValue({ [fieldName]: data });
                this.form.patchValue({ [fieldName + 'ContentType']: 'image/jpeg' });
            }, (err) => {
                alert('Unable to take photo');
            });
        } else {
            this.fileInput.nativeElement.click();
        }
    }

    processWebImage(event, fieldName) {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {

            let imageData = (readerEvent.target as any).result;
            const imageType = event.target.files[0].type;
            imageData = imageData.substring(imageData.indexOf(',') + 1);

            this.form.patchValue({ [fieldName]: imageData });
            this.form.patchValue({ [fieldName + 'ContentType']: imageType });
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.landingPageCard, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
}
