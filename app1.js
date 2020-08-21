// "use strict" -> enforces more stringent code rules (more sound)
// dynamic language => securely typed, manipulates variables to be all sorts of types
// let thisIsAString = 'hi'
// thisIsAString = { sayHi: 'hi' } // Hard to debug
// thisIsAString.split() // ??????????? there's no such thisIsAString

// This is TS code
// let thisIsAString: string = 'hi'
// thisIsAString = { sayHi: 'hi' } // ERROR stop being silly

// TYPESCRIPT -> JS
// let thisIsAString: any = 'hi'

/**
 * type Color = 'red' | 'blue' | 'green'
 * 
 * const newColor: Color = 'blue'
 * newColor = 'green'
 * 
 * Read up on TypeScript
 * .js, .jsx
 * .ts, .tsx
 * 
 * // Type inference, and editor autocomplete
 * const newColor = (color: Color): Color => color + 'hi' // ERRROR 
 * 
 * newColor('red') + 'bye' // allow me to do this
 * 
 * // autocomplete
 * type CoolObject = {
 *  coolFactor: number,
 *  coolSaying: string,
 * }
 * 
 * const IAmCool: CoolObject = {
 *   coolFactor: 9000,
 *   coolSaying: 'thats like your opinion man',
 * }
 */
const fs = require("fs");
const prompts = require("prompts");

let products = null;
let cartProducts = null;

fs.readFile("./products.json", "UTF8", (err, data) => {
  if (err) throw err;
  products = JSON.parse(data);
});

const welcomeMessage = () => {
  console.clear();
  console.log("Hello Welcome to a CLI Marketplace");
};

const menuPrompt = {
  type: "select",
  name: "choice",
  message: "What would you like to do?",
  choices: ["View Products", "Review Cart", "Checkout"],
};

const listPrompt = (products, title) => {
  const choices = products.map((prod, index) => ({
      title: `${prod.name} - $${prod.price}`,
      value: `${index}`,
    });

  return {
    type: "multiselect",
    message: title,
    choices: choices,
    name: "cartProducts",
    hint: "- Space to select. Enter to submit",
  };
};

// Object oriented programming: C#, Java, Javascript, Python, Ruby
// class car { velocity: 5, color: red } // factory, interface
// car.velocity = 10
// Youtuber FunFunFunction => object oriented vs functional programming

// Functional programming: Haskell, Lisp, Javascript
// What are monads? (Haskell - explain it to me)
/**
 * const changeValocity = (initialVelocity, changeToVelocity) => inititialVelocity + changeToVelocity
 * changeVelocity(5, 5)
 * 
 * Immutability - mutable? let, var
 * let velocity = 5
 * const changeVelocity = (velocity) => velocity = 10 /// HAS SIDE EFFECTS
 * console.log(velocity) // returns 10
 * 
 * const newVelocity = changeVelocity(5) // HAS NO SIDE EFFECTS
 * console.log velocity // 5
 * console.log newVelocity // 10
 * 
 * Google: JS mutable vs immutable functions.
 * Mutable: pop, shift
 * Immutable: .map,
 * 
 * Modern JS-land functional programming:
 * - Without sie effects: Easier debug code. obj 50 functions => newObject
 *  
 */

const cartView = () => {
  // If you can use a const. Use a const. Rewrite? (Google: JS mutable and non mutable funcions mpa pop slice split)
  // JS naming conventions -> getCartView
  // const numberArray = [1, 2, 3]
  

  // const someArray = [1, 2, 3]

  // const newArray = [...someArray, 4, 5, 6] // REST (.concat)
  let total = 0.0;
  let discount = false;

  const items = cartProducts.cartProducts.map((prod, ind) => {
    const { name, price } = products[prod];
    total += parseInt(price * 100);
    return `
      ${ind + 1}. ${name} - $${price}
    `;
  });

  const totalOver1000Discount = 0.2

  switch (true) {
    case total > 10000:
      discount = `${totalOver1000Discount * 100}% off on total greater than $100`;
      total = total * (1 - totalOver1000Discount);
      break;
    case total > 5000:
      discount = "15% off on total greater than $50";
      total = total * 0.85;
      break;
    case total > 1000:
      discount = "10% off on total greater than $20";
      total = total * 0.9;
      break;
  }
  console.log("Products in Shopping Cart: \n " + items);
  // BigInt google mdn

  if (discount) {
    console.log("Discount applied: " + discount + "\n");
  }
  console.log("TOTAL: $" + (total / 100).toFixed(2));
};

const Menu = async () => {
  const ans = await prompts(menuPrompt);
  switch (ans.choice) {
    case 0:
      cartProducts = await prompts(listPrompt(products, "Add to Cart"));
      await Menu();
      break;
    case 1:
      if (!cartProducts) {
        console.log("Your cart is empty");
        await Menu();
      } else {
        cartView();
      }
      break;
    case 2:
      console.log("thanks bye");
  }
};

const App = () => {
  welcomeMessage();
  Menu();
};

App();

/**
 * Things you've learnt that day: types in TypeScript, 
 * Things you'd like to learn (more) tomorrow: 1. x
 * 
 * 
 * Learnt: 
 *  - the difference between object-oriented programming and functional programming, 
 *  - the benefits of typescript
 * 
 * Tomorrow: 
 * - how to use typescript
 */