import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { KitchenApplianceTranslation } from './kitchen-appliance-translation.model';
import { KitchenApplianceTranslationService } from './kitchen-appliance-translation.service';
import { KitchenAppliance, KitchenApplianceService } from '../kitchen-appliance';

@Component({
    selector: 'page-kitchen-appliance-translation-update',
    templateUrl: 'kitchen-appliance-translation-update.html'
})
export class KitchenApplianceTranslationUpdatePage implements OnInit {

    kitchenApplianceTranslation: KitchenApplianceTranslation;
    kitchenAppliances: KitchenAppliance[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        translation: [null, [Validators.required]],
        language: [null, [Validators.required]],
        kitchenAppliance: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private kitchenApplianceService: KitchenApplianceService,
        private kitchenApplianceTranslationService: KitchenApplianceTranslationService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.kitchenApplianceService.query()
            .subscribe(data => { this.kitchenAppliances = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.kitchenApplianceTranslation = response.data;
            this.isNew = this.kitchenApplianceTranslation.id === null || this.kitchenApplianceTranslation.id === undefined;
        });
    }

    updateForm(kitchenApplianceTranslation: KitchenApplianceTranslation) {
        this.form.patchValue({
            id: kitchenApplianceTranslation.id,
            translation: kitchenApplianceTranslation.translation,
            language: kitchenApplianceTranslation.language,
            kitchenAppliance: kitchenApplianceTranslation.kitchenAppliance,
        });
    }

    save() {
        this.isSaving = true;
        const kitchenApplianceTranslation = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.kitchenApplianceTranslationService.update(kitchenApplianceTranslation));
        } else {
            this.subscribeToSaveResponse(this.kitchenApplianceTranslationService.create(kitchenApplianceTranslation));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<KitchenApplianceTranslation>>) {
        result.subscribe((res: HttpResponse<KitchenApplianceTranslation>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `KitchenApplianceTranslation ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/kitchen-appliance-translation');
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

    private createFromForm(): KitchenApplianceTranslation {
        return {
            ...new KitchenApplianceTranslation(),
            id: this.form.get(['id']).value,
            translation: this.form.get(['translation']).value,
            language: this.form.get(['language']).value,
            kitchenAppliance: this.form.get(['kitchenAppliance']).value,
        };
    }

    compareKitchenAppliance(first: KitchenAppliance, second: KitchenAppliance): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackKitchenApplianceById(index: number, item: KitchenAppliance) {
        return item.id;
    }
}
