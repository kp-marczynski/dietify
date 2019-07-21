import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAssignedMealPlan } from 'app/shared/model/appointments/assigned-meal-plan.model';

@Component({
  selector: 'jhi-assigned-meal-plan-detail',
  templateUrl: './assigned-meal-plan-detail.component.html'
})
export class AssignedMealPlanDetailComponent implements OnInit {
  assignedMealPlan: IAssignedMealPlan;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ assignedMealPlan }) => {
      this.assignedMealPlan = assignedMealPlan;
    });
  }

  previousState() {
    window.history.back();
  }
}
