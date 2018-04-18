var faker = require("faker");
var count = 0;

while(count < 10){
  var randProductName = faker.commerce.productName();
  var randPrice = faker.commerce.price();
  console.log("Product: " + randProductName + "   Price: " + randPrice);
  count++;
}
