import { Component, OnInit } from '@angular/core';
import { AssignedMealPlan } from './assigned-meal-plan.model';
import { AssignedMealPlanService } from './assigned-meal-plan.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-assigned-meal-plan-detail',
    templateUrl: 'assigned-meal-plan-detail.html'
})
export class AssignedMealPlanDetailPage implements OnInit {
    assignedMealPlan: AssignedMealPlan;

    constructor(
        private navController: NavController,
        private assignedMealPlanService: AssignedMealPlanService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.assignedMealPlan = response.data;
        });
    }

    open(item: AssignedMealPlan) {
        this.navController.navigateForward('/tabs/entities/assigned-meal-plan/' + item.id + '/edit');
    }

    async deleteModal(item: AssignedMealPlan) {
        const alert = await this.alertController.create({
            header: 'Confirm the deletion?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary'
                }, {
                    text: 'Delete',
                    handler: () => {
                        this.assignedMealPlanService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/assigned-meal-plan');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
