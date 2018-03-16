// alert("CONNECTED!");

var li_arr = document.getElementsByTagName("li");

// You cannot do the following:
//   li_arr[i].classList.add("hover")
// Becuase the for loop only exexcutes once and at the end of it i = 4 and therfore li_arr[4] is undefined. The anonomyous function is triggered when we mouseOver something. So "this" works because it refers to the current li that we are hovering over and thus we use that when executing our funcition
for(var i = 0; i < li_arr.length; i++){
  console.log(li_arr[i]);
  li_arr[i].addEventListener("mouseover", function(){
    // console.log("the value of i is: " + i);
    // li_arr[i].style.color = "blue";
    this.classList.add("hover");
  });
  li_arr[i].addEventListener("mouseout", function(){
    this.classList.remove("hover");
  });
  li_arr[i].addEventListener("click", function(){
    this.classList.toggle("selected");
  });
}
console.log(li_arr);
