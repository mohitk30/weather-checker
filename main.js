function getWeather() {

    var cityName = document.querySelector(".inputText").value;

    fetch("https://meta-weather.vercel.app/api/location/search/?query=" + cityName)
        .then(function weather(data) {
            return data.json();


        })
        .then(function weather(data) {
            var woeId = data[0].woeid;

            fetch("https://meta-weather.vercel.app/api/location/" + woeId + "/")
                .then(function weather(data) {
                    return data.json();


                })
                .then(function weather(data) {

                    console.log(data);
                    var cityTitle = data.title;
                    var countryN = data.parent.title;
                    var date = getDate(data.time);
                    var weatherData = data.consolidated_weather[0];

                    var generalWeather = weatherData.weather_state_name;
                    var temp = weatherData.the_temp;
                    var wSpeed = parseInt(weatherData.wind_speed);
                    var humid = weatherData.humidity;
                    var iab = weatherData.weather_state_abbr;
                    var apress = weatherData.air_pressure;
                    var maxT = Math.round(weatherData.max_temp);
                    var minT = Math.round(weatherData.min_temp);



                    var cityElement = document.querySelector(".city-name");

                    cityElement.textContent = cityTitle;

                    var countryElement = document.querySelector(".country");

                    countryElement.textContent = countryN;

                    var tempElement = document.querySelector(".temperature");

                    tempElement.textContent = temp + "° C";

                    var humiElement = document.querySelector(".humidity");

                    humiElement.textContent = humid + "%";

                    var wElement = document.querySelector(".wspeed");

                    wElement.textContent = wSpeed;

                    var subElement = document.querySelector(".subtitle");

                    subElement.textContent = date;

                    var nElement = document.querySelector(".nature");

                    nElement.textContent = generalWeather;
                    var iElement = document.getElementById('w-image');

                    iElement.src = "https://meta-weather.vercel.app/static/img/weather/" + iab + ".svg"

                    var AElement = document.querySelector(".air-press");

                    AElement.textContent = apress;

                    var MmElement = document.querySelector(".max-min");

                    MmElement.textContent = minT + "/" + maxT;


                })



        })


}






function getDate(dateString) {
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var d = new Date(dateString);
    return `${days[d.getDay()]}, ${d.toLocaleTimeString('en-US', {hour: 'numeric', minute:'numeric'})}`;
}