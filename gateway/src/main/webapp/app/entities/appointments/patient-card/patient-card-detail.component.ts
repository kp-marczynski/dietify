import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IPatientCard} from 'app/shared/model/appointments/patient-card.model';
import {MainLayoutCardService} from 'app/layouts/main/main-layout-card.service';
import {Chart} from 'chart.js';
import * as ChartAnnotation from 'chartjs-plugin-annotation';

@Component({
  selector: 'jhi-patient-card-detail',
  templateUrl: './patient-card-detail.component.html'
})
export class PatientCardDetailComponent implements OnInit, AfterViewInit {
  patientCard: IPatientCard;
  chart: Chart = null;

  private static randomScalingFactor(): number {
    return Math.random() * 10 + 20;
  }

  constructor(protected activatedRoute: ActivatedRoute,
              protected layoutCardService: MainLayoutCardService) {
  }

  ngOnInit() {
    this.layoutCardService.changeMainCardContainerVisibility(false);
    this.activatedRoute.data.subscribe(({patientCard}) => {
      this.patientCard = patientCard;
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const namedChartAnnotation = ChartAnnotation;
      namedChartAnnotation['id'] = 'annotation';
      Chart.pluginService.register(namedChartAnnotation);
      this.loadChart();
    });
  }

  previousState() {
    window.history.back();
  }

  loadChart() {
    const ctxP = (document.getElementById('canvas') as HTMLCanvasElement).getContext('2d');
    this.chart = new Chart(ctxP, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          backgroundColor: '#3498DB',
          borderColor: '#3498DB',
          data: [
            PatientCardDetailComponent.randomScalingFactor(),
            PatientCardDetailComponent.randomScalingFactor(),
            PatientCardDetailComponent.randomScalingFactor(),
            PatientCardDetailComponent.randomScalingFactor(),
            PatientCardDetailComponent.randomScalingFactor(),
            PatientCardDetailComponent.randomScalingFactor(),
            PatientCardDetailComponent.randomScalingFactor()
          ],
          fill: false,
        }]
      },
      options: {
        responsive: true,
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        },
        annotation: {
          annotations: [{
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
          }, {
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
          }, {
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
