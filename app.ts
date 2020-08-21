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

const argvRequestedProducts: number = process.argv.slice(2)[0];

class UserCart {
  productIDs: number[];
  totalCost: number;
  isDiscounted: boolean;
  constructor(storeProducts: object[], argvRequestedProducts: number) {
    this.productIDs = this.getProductIDs(storeProducts, argvRequestedProducts);
    this.totalCost = this.getDiscountedTotal(storeProducts, this.productIDs);
  }

  getProductIDs(storeProducts, argvRequestedProducts) {
    return storeProducts.filter((product, index) => {
      if (index < argvRequestedProducts) return product.uuid;
      // ADVICE: why does it return the whole object?
      // expected: only the a uuid to be returned 
      // acutal: the product object is returned
    });
  }

  getSum(storeProducts, cartProducts) {
    // getSum(storeProducts: object[], cartProducts: object[]) {
    // ADVICE: why does storeProduct.uuid and cartProduct.price get an error (this ^) is uncommented?
    // expected: no error as storeProducts is an array of objects
    // actual: error property doesn't exist
    let accumulator = 0;
    const cartProductPrices = cartProducts.map(
      (cartProduct) =>
        storeProducts.find((storeProduct) => storeProduct.uuid === cartProduct.uuid).price * 100
    );
    const sum = (cartProductPrices, accumulator) => {
      if (cartProductPrices.length == 0) {
        return accumulator;
        // an error lies in the return value of accumulator
        // expected: total sum of cartProductPrices
        // actual: undefined
      }
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
    } else if (sumTotal > 5000) {
      return sumTotal * (1 - sumTotalOver5000Discount);
    } else if (sumTotal > 1000) {
      return sumTotal * (1 - sumTotalOver1000Discount);
    }
  }
}

const currentUser = new UserCart(storeProducts, argvRequestedProducts);

console.log(`
Products in Shopping Cart:

${currentUser.productIDs
  .map((product, index) => {
    const { name, price } = product;
    return `${index + 1}. ${name} - ${price}\n`;
  })
  .join("")}

Discount applied: < Insert Discount Logic > 

TOTAL: < Await Discount Logic Insertion > 

`);
