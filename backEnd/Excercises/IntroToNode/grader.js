function average(arr){
  var sum = 0;
  for(var i = 0; i < arr.length; i++){
    sum +=arr[i];
  }
  return Math.round(sum/arr.length);
}

var scores = [90, 98, 89, 100, 100, 86, 94];
console.log("scores1 average: " + average(scores));

var scores2=[40, 65, 77, 82, 80, 54, 73, 63, 95, 49];
console.log("scores2 average: " + average(scores2));
