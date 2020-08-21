// MarketPlace challenge take 2
// typescript and functional remake
// - to keep this synchronous have to define the data as a const
const storeProducts = [
    {
        uuid: 1411,
        name: "Jockey Wheels - Orange",
        price: "15.39",
    },
    {
        uuid: 23881,
        name: "Chain Ring 146mm",
        price: "65.95",
    },
    {
        uuid: 13008,
        name: "Carbon Brake Pads",
        price: "92.00",
    },
    {
        uuid: 9101,
        name: "Front Derailleur - 34.9mm",
        price: "31.22",
    },
];
const argvRequestedProducts = process.argv.slice(2)[0];
class UserCart {
    constructor(storeProducts, argvRequestedProducts) {
        this.productIDs = this.getProductIDs(storeProducts, argvRequestedProducts);
        this.totalCost = this.getDiscountedTotal(storeProducts, this.productIDs);
    }
    getProductIDs(storeProducts, argvRequestedProducts) {
        return storeProducts.filter((product, index) => {
            const { uuid } = product;
            if (index < argvRequestedProducts)
                return uuid;
            // ADVICE: why does it return the whole object?
        });
    }
    // ADVICE: why does this break when uncommented?
    // getSum(storeProducts: object[], cartProducts: object[]) {
    getSum(storeProducts, cartProducts) {
        let accumulator = 0;
        const cartProductPrices = cartProducts.map((cartProduct) => storeProducts.find((storeProduct) => storeProduct.uuid === cartProduct.uuid).price * 100);
        const sum = (cartProductPrices, accumulator) => {
            if (cartProductPrices.length == 0) {
                // AGRH!: something about the call stack/ inheritance is breaking here :,C
                return accumulator;
            }
            console.log(cartProductPrices);
            console.log(accumulator);
            sum(cartProductPrices.slice(1), accumulator + cartProductPrices[0]);
        };
        return sum(cartProductPrices, accumulator);
    }
    getDiscountedTotal(storeProducts, cartProducts) {
        const sumTotalOver1000Discount = 0.1;
        const sumTotalOver5000Discount = 0.15;
        const sumTotalOver10000Discount = 0.2;
        const sumTotal = this.getSum(storeProducts, cartProducts);
        if (sumTotal > 10000) {
            return sumTotal * (1 - sumTotalOver10000Discount);
        }
        else if (sumTotal > 5000) {
            return sumTotal * (1 - sumTotalOver5000Discount);
        }
        else if (sumTotal > 1000) {
            return sumTotal * (1 - sumTotalOver1000Discount);
        }
    }
}
const currentUser = new UserCart(storeProducts, argvRequestedProducts);
console.log(`
Products in Shopping Cart:
${currentUser.}
Discount applied: 20% off on total greater than $100

TOTAL: $163.65

`);
