// alert("CONNECTED");

//Returns text of all li's
$("li").text();
//Changes content of all li's to CHANGED
$("li").text("Functions");
//Changes content of first li
$("li:first-of-type").text("Puppy");

//Adds a calss to an element
$("ul").addClass("correct");

//Adds a class to all of that element
$("li").addClass("wrong");

//Removes a class from all of that element
$("li").removeClass("wrong");

//Adds class to first of that type
$("li").first().css("color", "pink");

//Add class to last of that type
$("li").last().css("color", "blue");

//Reoves class if already has it and adds if doesnt
$("img").toggleClass("resize");

//Changes attributes of an element
$("input").attr("type", "color");
