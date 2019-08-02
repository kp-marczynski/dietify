import { Component, OnInit } from '@angular/core';
import { PatientCard } from './patient-card.model';
import { PatientCardService } from './patient-card.service';
import { NavController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'page-patient-card-detail',
    templateUrl: 'patient-card-detail.html'
})
export class PatientCardDetailPage implements OnInit {
    patientCard: PatientCard;

    constructor(
        private navController: NavController,
        private patientCardService: PatientCardService,
        private activatedRoute: ActivatedRoute,
        private alertController: AlertController
    ) { }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe((response) => {
            this.patientCard = response.data;
        });
    }

    open(item: PatientCard) {
        this.navController.navigateForward('/tabs/entities/patient-card/' + item.id + '/edit');
    }

    async deleteModal(item: PatientCard) {
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
                        this.patientCardService.delete(item.id).subscribe(() => {
                            this.navController.navigateForward('/tabs/entities/patient-card');
                        });
                    }
                }
            ]
        });
        await alert.present();
    }


}
