var movies = [
  {
    title: "The Notebook",
    rating: 5,
    hasWatched: true
  },
  {
    title: "Harry Potter",
    rating: 4,
    hasWatched: false
  },
  {
    title: "Dirty Dancing",
    rating: 3,
    hasWatched: true
  }
];

movies.forEach(function(movie){
  var seen;
  if(movie.hasWatched === true){
    seen = "watched";
  }else {
    seen = "not seen";
  }
  console.log("You have "+seen+" \""+movie.title+"\""+" - "+movie.rating+" stars");
});
