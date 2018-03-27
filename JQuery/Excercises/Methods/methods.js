// alert("CONNECTED");

//If the function has a parameter, it becomes a setter. Otherwise it is a getter by default

//Returns text of all li's
$("li").text();
//Changes content of all li's to "Functions"
$("li").text("Functions");
//Changes content of first li
$("li:first-of-type").text("Puppy");

//Adds a class to an element
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
// $("input").attr("type", "color");
$("img").first().attr("src", "http://a57.foxnews.com/images.foxnews.com/content/fox-news/lifestyle/2017/11/09/how-to-keep-cat-from-scratching-your-sofa-to-shreds/_jcr_content/par/featured_image/media-0.img.jpg/931/524/1510172827500.jpg?ve=1&tl=1&text=big-top-image" )

//Val helps us extract the value form an input (what user types/selects)
$("input").val();

//We can use val to set what is in our input field as well, such as setting it back to an empty string after some event such as after adds something to task list you clear input field so they can add a new item to the list
$("input").val("");

//html() doesnt change just the content but the actual html code. Ex. we want to add links to othe 4th li. If using multiple cases of "", mix it up with ''
$("li:nth-of-type(4)").html("<a href='https://www.wikipedia.org/'>WIKEPEDIA</a>");
