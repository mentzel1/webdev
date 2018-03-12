// Determines where number is even or not
// function isEven(number){
//   if(number%2 === 0){
//     return true;
//   }
//   return false;
// }

function isEven(number){
  return number%2 === 0;
}

// Returns the factorial of the given positive number
// function factorial(num){
//   var result=num;
//   if( num < 0){
//     console.log("Please input a number greater than 0!")
//     return;
//   }
//   if(num === 0 || num === 1)
//     return 1;
//
//   while(num != 1){
//     num--;
//     result = result*(num);
//   }
//     return result;
// }
function factorial(num){
  var result=1;
  for(var i=1; i<=num; i++){
    result *= i;
  }
  return result;
}
// Returns a string with "-" replaced with "_"
function kebabToSnake(string){
  return string.replace(/-/g, "_");
}
