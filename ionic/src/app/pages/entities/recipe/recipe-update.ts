import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { JhiDataUtils } from 'ng-jhipster';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FormBuilder, Validators } from '@angular/forms';
import { NavController, Platform, ToastController } from '@ionic/angular';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { RecipeBasicNutritionData, RecipeBasicNutritionDataService } from '../recipe-basic-nutrition-data';
import { KitchenAppliance, KitchenApplianceService } from '../kitchen-appliance';
import { DishType, DishTypeService } from '../dish-type';
import { MealType, MealTypeService } from '../meal-type';

@Component({
    selector: 'page-recipe-update',
    templateUrl: 'recipe-update.html'
})
export class RecipeUpdatePage implements OnInit {

    recipe: Recipe;
    recipeBasicNutritionData: RecipeBasicNutritionData[];
    recipes: Recipe[];
    kitchenAppliances: KitchenAppliance[];
    dishTypes: DishType[];
    mealTypes: MealType[];
    @ViewChild('fileInput') fileInput;
    cameraOptions: CameraOptions;
    creationDateDp: any;
    lastEditDateDp: any;
    isSaving = false;
    isNew = true;
    isReadyToSave: boolean;

    form = this.formBuilder.group({
        id: [],
        name: [null, [Validators.required]],
        preparationTimeMinutes: [null, [Validators.required]],
        numberOfPortions: [null, [Validators.required]],
        image: [null, []],
        imageContentType: [null, []],
        authorId: [null, [Validators.required]],
        creationDate: [null, [Validators.required]],
        lastEditDate: [null, [Validators.required]],
        isVisible: ['false', [Validators.required]],
        language: [null, [Validators.required]],
        totalGramsWeight: [null, [Validators.required]],
        basicNutritionData: [null, [Validators.required]],
        sourceRecipe: [null, []],
          kitchenAppliances: [null, []],
          dishTypes: [null, []],
          mealTypes: [null, []],
    });

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected navController: NavController,
        protected formBuilder: FormBuilder,
        protected platform: Platform,
        protected toastCtrl: ToastController,
        private dataUtils: JhiDataUtils,

        private elementRef: ElementRef,
        private camera: Camera,
        private recipeBasicNutritionDataService: RecipeBasicNutritionDataService,
        private kitchenApplianceService: KitchenApplianceService,
        private dishTypeService: DishTypeService,
        private mealTypeService: MealTypeService,
        private recipeService: RecipeService
    ) {

        // Watch the form for changes, and
        this.form.valueChanges.subscribe((v) => {
            this.isReadyToSave = this.form.valid;
        });

        // Set the Camera options
        this.cameraOptions = {
            quality: 100,
            targetWidth: 900,
            targetHeight: 600,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            saveToPhotoAlbum: false,
            allowEdit: true,
            sourceType: 1
        };
    }

    ngOnInit() {
        this.recipeBasicNutritionDataService
            .query({filter: 'recipe-is-null'})
            .subscribe(data => {
                if (!this.recipe.basicNutritionData || !this.recipe.basicNutritionData.id) {
                    this.recipeBasicNutritionData = data;
                } else {
                    this.recipeBasicNutritionDataService
                        .find(this.recipe.basicNutritionData.id)
                        .subscribe((subData: RecipeBasicNutritionData) => {
                            this.recipeBasicNutritionData = [subData].concat(subData);
                        }, (error) => this.onError(error));
                }
            }, (error) => this.onError(error));
        this.recipeService.query()
            .subscribe(data => { this.recipes = data.body; }, (error) => this.onError(error));
        this.kitchenApplianceService.query()
            .subscribe(data => { this.kitchenAppliances = data.body; }, (error) => this.onError(error));
        this.dishTypeService.query()
            .subscribe(data => { this.dishTypes = data.body; }, (error) => this.onError(error));
        this.mealTypeService.query()
            .subscribe(data => { this.mealTypes = data.body; }, (error) => this.onError(error));
        this.activatedRoute.data.subscribe((response) => {
            this.updateForm(response.data);
            this.recipe = response.data;
            this.isNew = this.recipe.id === null || this.recipe.id === undefined;
        });
    }

    updateForm(recipe: Recipe) {
        this.form.patchValue({
            id: recipe.id,
            name: recipe.name,
            preparationTimeMinutes: recipe.preparationTimeMinutes,
            numberOfPortions: recipe.numberOfPortions,
            image: recipe.image,
            imageContentType: recipe.imageContentType,
            authorId: recipe.authorId,
            creationDate: recipe.creationDate,
            lastEditDate: recipe.lastEditDate,
            isVisible: recipe.isVisible,
            language: recipe.language,
            totalGramsWeight: recipe.totalGramsWeight,
            basicNutritionData: recipe.basicNutritionData,
            sourceRecipe: recipe.sourceRecipe,
            kitchenAppliances: recipe.kitchenAppliances,
            dishTypes: recipe.dishTypes,
            mealTypes: recipe.mealTypes,
        });
    }

    save() {
        this.isSaving = true;
        const recipe = this.createFromForm();
        if (!this.isNew) {
            this.subscribeToSaveResponse(this.recipeService.update(recipe));
        } else {
            this.subscribeToSaveResponse(this.recipeService.create(recipe));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<Recipe>>) {
        result.subscribe((res: HttpResponse<Recipe>) => this.onSaveSuccess(res), (res: HttpErrorResponse) => this.onError(res.error));
    }

    async onSaveSuccess(response) {
        let action = 'updated';
        if (response.status === 201) {
          action = 'created';
        }
        this.isSaving = false;
        const toast = await this.toastCtrl.create({message: `Recipe ${action} successfully.`, duration: 2000, position: 'middle'});
        toast.present();
        this.navController.navigateBack('/tabs/entities/recipe');
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

    private createFromForm(): Recipe {
        return {
            ...new Recipe(),
            id: this.form.get(['id']).value,
            name: this.form.get(['name']).value,
            preparationTimeMinutes: this.form.get(['preparationTimeMinutes']).value,
            numberOfPortions: this.form.get(['numberOfPortions']).value,
            image: this.form.get(['image']).value,
            imageContentType: this.form.get(['imageContentType']).value,
            authorId: this.form.get(['authorId']).value,
            creationDate: this.form.get(['creationDate']).value,
            lastEditDate: this.form.get(['lastEditDate']).value,
            isVisible: this.form.get(['isVisible']).value,
            language: this.form.get(['language']).value,
            totalGramsWeight: this.form.get(['totalGramsWeight']).value,
            basicNutritionData: this.form.get(['basicNutritionData']).value,
            sourceRecipe: this.form.get(['sourceRecipe']).value,
            kitchenAppliances: this.form.get(['kitchenAppliances']).value,
            dishTypes: this.form.get(['dishTypes']).value,
            mealTypes: this.form.get(['mealTypes']).value,
        };
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
        this.processWebImage(event, field);
    }

    getPicture(fieldName) {
        if (Camera.installed()) {
            this.camera.getPicture(this.cameraOptions).then((data) => {
                this.recipe[fieldName] = data;
                this.recipe[fieldName + 'ContentType'] = 'image/jpeg';
                this.form.patchValue({ [fieldName]: data });
                this.form.patchValue({ [fieldName + 'ContentType']: 'image/jpeg' });
            }, (err) => {
                alert('Unable to take photo');
            });
        } else {
            this.fileInput.nativeElement.click();
        }
    }

    processWebImage(event, fieldName) {
        const reader = new FileReader();
        reader.onload = (readerEvent) => {

            let imageData = (readerEvent.target as any).result;
            const imageType = event.target.files[0].type;
            imageData = imageData.substring(imageData.indexOf(',') + 1);

            this.form.patchValue({ [fieldName]: imageData });
            this.form.patchValue({ [fieldName + 'ContentType']: imageType });
        };

        reader.readAsDataURL(event.target.files[0]);
    }

    clearInputImage(field: string, fieldContentType: string, idInput: string) {
        this.dataUtils.clearInputImage(this.recipe, this.elementRef, field, fieldContentType, idInput);
        this.form.patchValue( {[field]: ''} );
    }
    compareRecipeBasicNutritionData(first: RecipeBasicNutritionData, second: RecipeBasicNutritionData): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackRecipeBasicNutritionDataById(index: number, item: RecipeBasicNutritionData) {
        return item.id;
    }
    compareRecipe(first: Recipe, second: Recipe): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackRecipeById(index: number, item: Recipe) {
        return item.id;
    }
    compareKitchenAppliance(first: KitchenAppliance, second: KitchenAppliance): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackKitchenApplianceById(index: number, item: KitchenAppliance) {
        return item.id;
    }
    compareDishType(first: DishType, second: DishType): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackDishTypeById(index: number, item: DishType) {
        return item.id;
    }
    compareMealType(first: MealType, second: MealType): boolean {
        return first && second ? first.id === second.id : first === second;
    }

    trackMealTypeById(index: number, item: MealType) {
        return item.id;
    }
}
