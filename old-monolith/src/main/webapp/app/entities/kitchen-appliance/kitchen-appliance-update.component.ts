import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IKitchenAppliance } from 'app/shared/model/kitchen-appliance.model';
import { KitchenApplianceService } from './kitchen-appliance.service';

@Component({
    selector: 'jhi-kitchen-appliance-update',
    templateUrl: './kitchen-appliance-update.component.html'
})
export class KitchenApplianceUpdateComponent implements OnInit {
    kitchenAppliance: IKitchenAppliance;
    isSaving: boolean;

    constructor(protected kitchenApplianceService: KitchenApplianceService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ kitchenAppliance }) => {
            this.kitchenAppliance = kitchenAppliance;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.kitchenAppliance.id !== undefined) {
            this.subscribeToSaveResponse(this.kitchenApplianceService.update(this.kitchenAppliance));
        } else {
            this.subscribeToSaveResponse(this.kitchenApplianceService.create(this.kitchenAppliance));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IKitchenAppliance>>) {
        result.subscribe((res: HttpResponse<IKitchenAppliance>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
