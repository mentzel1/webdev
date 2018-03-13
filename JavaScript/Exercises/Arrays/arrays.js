alert("YAYA");
// printReverse() prints the items of an array in reverse order
function printReverse(arr){
  for(var i=arr.length-1; i>= 0; i--){
    console.log(arr[i]);
  }
}

// NOTE: return terminates the foreach loop but not the isUniform function. Hence we need to either use a for loop which would be simplier or we can just set a variable to true or false as shown below

// isUniform() returns true if all elements in the array are identitcal
function isUniform(arr){
  var uniform = true;
  if(arr.length <= 1){
      uniform = true;
  }

  var temp = arr[0];
  arr.forEach(function(item){
    if(temp !== item){
      uniform = false;
    }
  });
  return uniform;
}

// sumArray() returns the sum of all the items in an sumArray
function sumArray(arr){
  var sum = 0;
  arr.forEach(function(item){
    sum += item;
  });
  return sum;
}

// max() returns the max value in the array
function max(arr){
  if(arr.length === 0)
    return;

  var currMax = arr[0];
  arr.forEach(function(item){
    if(item > currMax){
      currMax = item;
    }
  });
  return currMax;
}
