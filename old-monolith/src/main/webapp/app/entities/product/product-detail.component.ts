import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {IProduct} from 'app/shared/model/product.model';
import {Chart} from 'chart.js';
import {BasicNutritionType} from 'app/shared/model/enum/basic-nutritions.enum';

@Component({
    selector: 'jhi-product-detail',
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit, AfterViewInit {
    product: IProduct;
    chart: Chart = null;

    constructor(protected activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({product}) => {
            this.product = product;
        });
    }

    ngAfterViewInit() {
        setTimeout(() => this.loadChart());
    }

    previousState() {
        window.history.back();
    }

    loadChart() {
        const result = this.product.nutritionData.filter(
            data =>
                data.nutritionDefinition.tagname === BasicNutritionType.Fat.toString() ||
                data.nutritionDefinition.tagname === BasicNutritionType.Carbohydrates.toString() ||
                data.nutritionDefinition.tagname === BasicNutritionType.Protein.toString()
        );
        let otherNutritions = 100;
        for (const nutritionData of result) {
            otherNutritions -= nutritionData.nutritionValue;
        }
        otherNutritions = Math.round(otherNutritions);
        const ctxP = (document.getElementById('canvas') as HTMLCanvasElement).getContext('2d');
        this.chart = new Chart(ctxP, {
            type: 'pie',
            data: {
                labels: result.map(data => data.nutritionDefinition.descriptionEnglish).concat('Other'),
                datasets: [
                    {
                        data: result.map(data => data.nutritionValue).concat(otherNutritions),
                        backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
                        hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774']
                    }
                ]
            },
            options: {
                responsive: true
            }
        });
    }
}
