import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPatientCard } from 'app/shared/model/appointments/patient-card.model';
import { MainLayoutCardService } from 'app/layouts/main/main-layout-card.service';
import { Chart } from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import { IBmiResult } from 'app/shared/model/appointments/bmi-result.model';
import { PatientCardService } from 'app/entities/appointments/patient-card/patient-card.service';
import * as moment from 'moment';

@Component({
  selector: 'jhi-patient-card-detail',
  templateUrl: './patient-card-detail.component.html'
})
export class PatientCardDetailComponent implements OnInit, AfterViewInit {
  patientCard: IPatientCard;
  chart: Chart = null;

  bmiResults: IBmiResult[];

  private static randomScalingFactor(): number {
    return Math.random() * 10 + 20;
  }

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected layoutCardService: MainLayoutCardService,
    protected patientCardService: PatientCardService
  ) {}

  ngOnInit() {
    this.layoutCardService.changeMainCardContainerVisibility(false);
    this.activatedRoute.data.subscribe(({ patientCard }) => {
      this.patientCard = patientCard;
      this.patientCardService.getBmiResults(patientCard.id).subscribe(res => {
        this.bmiResults = res.body;
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.bmiResults) {
        const namedChartAnnotation = ChartAnnotation;
        namedChartAnnotation['id'] = 'annotation';
        Chart.pluginService.register(namedChartAnnotation);
        this.loadChart();
      } else {
        this.ngAfterViewInit();
      }
    }, 100);
  }

  previousState() {
    window.history.back();
  }

  loadChart() {
    const ctxP = (document.getElementById('canvas') as HTMLCanvasElement).getContext('2d');
    this.chart = new Chart(ctxP, {
      type: 'line',
      data: {
        labels: this.bmiResults.map(res => moment(res.date).format('MM/YY')),
        datasets: [
          {
            backgroundColor: '#3498DB',
            borderColor: '#3498DB',
            data: this.bmiResults.map(res => res.bmi),
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Month'
              }
            }
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Value'
              }
            }
          ]
        },
        annotation: {
          annotations: [
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 16,
              borderColor: '#E74C3C',
              borderWidth: 2,
              label: {
                enabled: false,
                content: 'Test label'
              }
            },
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 17,
              borderColor: '#F39C12',
              borderWidth: 2,
              label: {
                enabled: false,
                content: 'Test label'
              }
            },
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 18.5,
              borderColor: '#18BC9C',
              borderWidth: 2,
              label: {
                enabled: false,
                content: 'Test label'
              }
            },
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 25,
              borderColor: '#18BC9C',
              borderWidth: 2,
              label: {
                enabled: false,
                content: 'Test label'
              }
            },
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 30,
              borderColor: '#F39C12',
              borderWidth: 2,
              label: {
                enabled: false,
                content: 'Test label'
              }
            },
            {
              type: 'line',
              mode: 'horizontal',
              scaleID: 'y-axis-0',
              value: 35,
              borderColor: '#E74C3C',
              borderWidth: 2,
              label: {
                enabled: false,
                content: 'Test label'
              }
            }
          ]
        },
        legend: {
          display: false
        }
      }
    });
  }
}
