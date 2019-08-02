import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { OwnedKitchenAppliance } from './owned-kitchen-appliance.model';
import { OwnedKitchenApplianceService } from './owned-kitchen-appliance.service';
import { NutritionalInterview, NutritionalInterviewService } from '../nutritional-interview';

@Component({
    selector: 'page-owned-kitchen-appliance-update',
    templateUrl: 'owned-kitchen-appliance-update.html'
})
export class OwnedKitchenApplianceUpdatePage implements OnInit {

    ownedKitchenAppliance: OwnedKitchenAppliance;
    nutritionalInterviews: NutritionalInterview[];
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        kitchenApplianceId: [null, [Validators.required]],
        nutritionalInterview: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private nutritionalInterviewService: NutritionalInterviewService,
        private ownedKitchenApplianceService: OwnedKitchenApplianceService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.nutritionalInterviewService.query()
            .subscribe(data => { this.nutritionalInterviews = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.ownedKitchenAppliance = response.data;
            this.isNew = this.ownedKitchenAppliance.id === null || this.ownedKitchenAppliance.id === undefined;
        });
    }

    updateForm(ownedKitchenAppliance: OwnedKitchenAppliance) {
        this.form.patchValue({
            id: ownedKitchenAppliance.id,
            kitchenApplianceId: ownedKitchenAppliance.kitchenApplianceId,
            nutritionalInterview: ownedKitchenAppliance.nutritionalInterview,
        });
    }

    save() {
        this.isSaving = true;
        const ownedKitchenAppliance = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.ownedKitchenApplianceService.update(ownedKitchenAppliance));
        } else {
            this.subscribeToSaveResponse(this.ownedKitchenApplianceService.create(ownedKitchenAppliance));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<OwnedKitchenAppliance>>) {
        result.subscribe((res: HttpResponse<OwnedKitchenAppliance>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `OwnedKitchenAppliance ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/owned-kitchen-appliance');
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

    private createFromForm(): OwnedKitchenAppliance {
        return {
            ...new OwnedKitchenAppliance(),
            id: this.form.get(['id']).value,
            kitchenApplianceId: this.form.get(['kitchenApplianceId']).value,
            nutritionalInterview: this.form.get(['nutritionalInterview']).value,
        };
    }

    compareNutritionalInterview(first: NutritionalInterview, second: NutritionalInterview): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackNutritionalInterviewById(index: number, item: NutritionalInterview) {
        return item.id;
    }
}
