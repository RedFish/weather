var _ = require('lodash');
var rootURL = 'http://api.openweathermap.org/data/2.5/weather?APPID=b6a7d36fb75e138111839e3b9d1b42a0';

var KelvintoC = function(kelvin) {
  return Math.round((kelvin - 273.15)) + ' °C'
};

module.exports = function(latitude,longitude) {
  //var url = rootURL + '&lat=' +35 + '&lon=' + 139
  var url = `${rootURL}&lat=${latitude}&lon=${longitude}`;

  return fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json){
      return {
        city: json.name,
        temperature: KelvintoC(json.main.temp),
        description: _.capitalize(json.weather[0].description)
      }
    });
}
