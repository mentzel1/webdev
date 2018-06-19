var request = require("request");
request("http://autocomplete.wunderground.com/aq?query=San%20F", function(error, response, body){
  if(error){
    console.log("ERROR!!");
    console.log("error:", error);
  }else{
    if(response.statusCode==200){
      console.log("status code:", response.statusCode);
      console.log("body:", body);
    }
  }
});
