// alert("HELLO!");

// Print all the numbers between -10 and 19
var count = -10;
while(count <20){
  console.log(count);
  count++;
}

// Print all the even numbers between 10 and 40
count = 10;
while(count <= 40){
  if(count%2 === 0){
    console.log(count);
  }
  count++;
}

// Print all the odd numbers between 300 and 333
count = 300;
while(count <=333){
  if(count%2 !== 0){
    console.log(count);
  }
    count++;
}

// Print all numbers divisible by 5 and 3 between 5 and 50
count = 5;
while(count <= 50){
  if(count%5 === 0 && count%3 === 0){
    console.log(count);
  }
    count++;
}
