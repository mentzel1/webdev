var request = require("request");
request("https://query.yahooapis.com/v1/public/yql?q=select%20astronomy.sunset%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22maui%2C%20hi%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys", function(error, response, body){
  if(error){
    console.log("ERROR!!");
    console.log("error:", error);
  }else{
    if(response.statusCode==200){
      //By default results from web APIs are strings
      console.log("type: " + typeof body);
      console.log("status code:", response.statusCode);
      //You can convert the json string to an object using built in parse function
      var dataObj = JSON.parse(body);
      console.log("New Type: " + typeof dataObj);
      console.log("body:", dataObj);

      console.log("Sunset time in Hawaii is at: " + dataObj.query.results.channel.astronomy.sunset);
    }
  }
});
