 var background = 
  	["https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/9KMFNLD5PP.jpg",
  	"https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/ZPZK3FNJ07.jpg",
  	"https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/FI52FC5T9S.jpg",
  	"https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/UPV8UMAJDR.jpg",
  	"https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/PL8J85JJP0.jpg",
  	"https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/T6W4P0LDDK.jpg",
  	"https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/SXZDAYMCF9.jpg",
  	"https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/LY9CPZ4NDL.jpg",
  	"https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/NX6XW0ECSK.jpg",
  	"https://d2lm6fxwu08ot6.cloudfront.net/img-thumbs/960w/9LW4OB0ESY.jpg"]

  	function randoNum(){
  		var number = Math.floor(Math.random() * 10);
  		return number;
  	}
$('body').css("background-image" , "url(" + background[randoNum()] + ")");
  
  var realPosition = {
  	lat: 0,
  	lon: 0
  };

  var hope = {

  };

var lon = "";
var lat = "";
var icon = "";
var temp = "";
 

function findMe(){
	 if(navigator.geolocation){
	 	navigator.geolocation.getCurrentPosition(function(position){
	
	
	realPosition.lat = position.coords.latitude;
	realPosition.lon = position.coords.longitude;
	lat = realPosition.lat;
	lon = realPosition.lon;
	$.getJSON("https://api.darksky.net/forecast/3b84024871aef976d646f09db58974da/" + lat + "," + lon, function(weather){
	hope = weather;
	icon = weather.minutely.icon;
	temp = Math.floor(weather.currently.apparentTemperature);
	// had to save api call data to a blank object otherwise I couldnt touch the data with jquery or javascript. we can now work from here
	// assign city name and other stuff right here in this area to your h1s and stuff like that. 


	$('#report').html("<p> Location: " + hope.timezone + "</p><br>" + "<p>Your current weather conditions are: " + hope.currently.summary + "</p><br>" + "<p> The current temperature is: " + temp + "&deg;" + "F</p>");
	$('.clear').addClass("wi wi-forecast-io-" + icon);
});

		});
	}
	// I am running showposition as a callback function inside the position function  you can run navigator as a stand alone iife(function){});
	// no longer using showposition function was too messy everything fits perfectly into the find me function. 
	 else{
		$('.display').html("Geolocation not avilable for this device");
	 }
 }
	 
	



findMe();

$('#cel').on('click', function(){
var celTemp = Math.floor((temp - 32) * 5/9);
$('#report').html("<p> Location: " + hope.timezone + "</p><br>" + "<p>Your current weather conditions are: " + hope.currently.summary + "</p><br>" + "<p> The current temperature is: " + celTemp +  "&deg;" + "C</p>");


});

$('#fah').on('click', function(){
	$('#report').html("<p> Location: " + hope.timezone + "</p><br>" + "<p>Your current weather conditions are: " + hope.currently.summary + "</p><br>" + "<p> The current temperature is: " + temp + "&deg;" + "F</p>");
});