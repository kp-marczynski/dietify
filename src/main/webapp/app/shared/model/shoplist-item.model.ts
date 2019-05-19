export class ShoplistItem {
    public productId: number;
    public productName: string;
    public amount: number;

    constructor(productId: number, productName: string, amount: number) {
        this.productId = productId;
        this.productName = productName;
        this.amount = amount;
    }
}
