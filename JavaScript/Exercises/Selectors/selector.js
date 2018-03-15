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
    var img = document.querySelector("img");
    var a = document.querySelector("a");
    img.setAttribute("src", "https://23fb88ad5ca22a1b4d32-e1951aed44f4258f5fd1721b94cf0277.ssl.cf5.rackcdn.com/IL002-ipad.jpg")
    a.setAttribute("href", "https://www.google.com/")
    a.textContent ="Google Link!";
    clicked = false;
  }else{
    document.querySelector("p").classList.remove("change");
    document.querySelector("h1").textContent= "I am an h1!";
    var img = document.querySelector("img");
    var a = document.querySelector("a");
    img.setAttribute("src", "https://23fb88ad5ca22a1b4d32-e1951aed44f4258f5fd1721b94cf0277.ssl.cf5.rackcdn.com/IL002-ipad.jpg")
    a.setAttribute("href", "http://illinois.edu/")
    a.textContent = "Illinois Website";
    clicked = true;
  }
  document.querySelector("button").classList.toggle("button");
  var tag = document.querySelector("p")
  console.log("tag: " + tag);
  console.log("innerHTML gives us: " + tag.innerHTML);
  console.log("textContent gives us: " + tag.textContent);
}
