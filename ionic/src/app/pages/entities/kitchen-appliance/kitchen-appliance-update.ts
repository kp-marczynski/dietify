import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { KitchenAppliance } from './kitchen-appliance.model';
import { KitchenApplianceService } from './kitchen-appliance.service';

@Component({
    selector: 'page-kitchen-appliance-update',
    templateUrl: 'kitchen-appliance-update.html'
})
export class KitchenApplianceUpdatePage implements OnInit {

    kitchenAppliance: KitchenAppliance;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        name: [null, [Validators.required]],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private kitchenApplianceService: KitchenApplianceService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.kitchenAppliance = response.data;
            this.isNew = this.kitchenAppliance.id === null || this.kitchenAppliance.id === undefined;
        });
    }

    updateForm(kitchenAppliance: KitchenAppliance) {
        this.form.patchValue({
            id: kitchenAppliance.id,
            name: kitchenAppliance.name,
        });
    }

    save() {
        this.isSaving = true;
        const kitchenAppliance = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.kitchenApplianceService.update(kitchenAppliance));
        } else {
            this.subscribeToSaveResponse(this.kitchenApplianceService.create(kitchenAppliance));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<KitchenAppliance>>) {
        result.subscribe((res: HttpResponse<KitchenAppliance>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `KitchenAppliance ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/kitchen-appliance');
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

    private createFromForm(): KitchenAppliance {
        return {
            ...new KitchenAppliance(),
            id: this.form.get(['id']).value,
            name: this.form.get(['name']).value,
        };
    }

}
