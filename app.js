const fs = require("fs");
const prompts = require("prompts");

let products = null;
let cart = null;

fs.readFile("./products.json", "UTF8", (err, data) => {
  if (err) throw err;
  products = JSON.parse(data);
});

const welcomePrompt = () => {
  console.clear();
  console.log("Hello Welcome to a CLI Marketplace");
};

const mainMenu = {
  type: "select",
  name: "choice",
  message: "What would you like to do?",
  choices: ["View Products", "Review Cart", "Checkout"],
};

const productList = (products) => {
  const choices = products.map((prod, index) => {
    return {
      title: `${prod.name} - $${prod.price}`,
      value: `${index}`,
    };
  });
  return {
    type: "multiselect",
    name: "selectedProducts",
    message: "Products List",
    choices: choices,
    hint: "- Space to select. Enter to submit",
  };
};

const Menu = async () => {
  const ans = await prompts(mainMenu);
  switch (ans.choice) {
    case 0:
      cart = await prompts(productList(products));
      await Menu();
    case 2:
      return;
  }
};

const App = async () => {
  welcomePrompt();
  await Menu();
  console.log(cart);
};

App();
