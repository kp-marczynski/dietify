export class MailableMealPlan {
    public recipientEmail: string;
    public days: MailableDay[];

    constructor() {
        this.days = [];
    }
}

export class MailableDay {
    public meals: MailableMeal[];

    constructor(public ordinalNumber: number) {
        this.meals = [];
    }
}

export class MailableMeal {
    public products: MailableProduct[];
    public recipes: MailableRecipe[];

    constructor(public ordinalNumber: number) {
        this.products = [];
        this.recipes = [];
    }

}

export class MailableProduct {
    public name: string;
    public measureDescription: string;
    public amount: number;
    
    constructor(name: string, measureDescription: string, amount: number) {
        this.name = name;
        this.measureDescription = measureDescription;
        this.amount = amount;
    }
}

export class MailableRecipe extends MailableProduct {
}
