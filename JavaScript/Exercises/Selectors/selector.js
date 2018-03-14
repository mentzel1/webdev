alert("YAY!");

var id = document.getElementById("first");
console.log("We returned by id: " + id);

var query = document.querySelector(".special");
console.log("We returned by querySelector: " + query);

var tagName = document.getElementsByTagName("p")[0];
console.log("We returned by tagName: " + tagName);

var queryAll = document.querySelectorAll("p")[0];
console.log("We returned by querySelectorAll: " + queryAll);

var creative = document.querySelector("h1 + p");
console.log("We returned by querySelector creativly: " + creative);

var clicked = true;

function freaky(){
  if(clicked){
    document.querySelector("p").classList.add("change");
    document.querySelector("h1").textContent= "WE CHANGED THE TITLE";
    clicked = false;
  }else{
    document.querySelector("p").classList.remove("change");
    document.querySelector("h1").textContent= "I am an h1!";
    clicked = true;
  }
  document.querySelector("button").classList.toggle("button");
  var tag = document.querySelector("p")
  console.log("tag: " + tag);
  console.log("innerHTML gives us: " + tag.innerHTML);
  console.log("textContent gives us: " + tag.textContent);
}
