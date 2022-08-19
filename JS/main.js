// CURRENT DAY VARIABLES............
let current = document.querySelector("#currentDay");
let currentDate = document.querySelector("#date");
let currentCity = document.querySelector("#city");
let currentTemp = document.querySelector("#currentTemp");
let usersearch = document.querySelector("#usercity");
let currentState = document.querySelector("#currentState");
let currentIcon = document.querySelector("#current-icon");
// NEXT DAY VARIABLES............
let next = document.querySelector("#nextDay");
let nextMaxTemp = document.querySelector(".nextMaxTemp");
let nextMinTemp = document.querySelector(".nextMinTemp")
let nextState = document.querySelector(".nextState");
let nextIcon = document.querySelector("#nextIcon");
// THIRD DAY VARIABLES............
let third = document.querySelector("#thirdDay");
let thirdMaxTemp = document.querySelector(".thirdMaxTemp");
let thirdMinTemp = document.querySelector(".thirdMinTemp")
let thirdState = document.querySelector(".thirdState");
let thirdIcon = document.querySelector("#thirdIcon");


async function getWeather(city = "Cairo") {
    
    let selectedCity = city;
    let myKey = "c22e51960dac495ca4565757211809";
    let url = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${selectedCity}&days=3`);
    let weatherData = await url.json();

    console.log(weatherData)
    let stateOne = weatherData.current.condition.text;
    let stateTwo = weatherData.forecast.forecastday[1].day.condition.text;
    let stateThree = weatherData.forecast.forecastday[2].day.condition.text;

// CURRENT DAY WEATHER DETAILS....
    currentCity.innerHTML = weatherData.location.name;
    currentTemp.innerHTML = `${weatherData.current.temp_c} <sup>o</sup>C`;
    currentState.innerHTML = stateOne;
    currentIcon.setAttribute("src", `https:${weatherData.current.condition.icon}`);

//SECOND DAY WEATHER SETAILS.... 
    nextIcon.setAttribute("src", `https:${weatherData.forecast.forecastday[1].day.condition.icon}`);
    nextMaxTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup>C`;
    nextMinTemp.innerHTML = `${weatherData.forecast.forecastday[1].day.mintemp_c} <sup>o</sup>C`;
    nextState.innerHTML = stateTwo;
//THIRD DAY WEATHER DETAILES ...
    thirdIcon.setAttribute("src", `https:${weatherData.forecast.forecastday[2].day.condition.icon}`);
    thirdMaxTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup>C`;
    thirdMinTemp.innerHTML = `${weatherData.forecast.forecastday[2].day.mintemp_c} <sup>o</sup>C`;
    thirdState.innerHTML = stateThree;

    fullDate();
};

getWeather();

usersearch.addEventListener("keyup", async () => {
    selectedCity = usersearch.value;
    await getWeather(selectedCity);
});



// DATE FUNCTION ..........
fullDate = () =>{

    let monthsName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    let daysName = ["Sunday", "Monady", "Tuesday", "Wednesday", "Thursday","Friday", "Saturday"];
    let newDate = new Date();
// MONTH VARIABLES...........
    let month = newDate.getMonth();
    let date = newDate.getDate();
    let fullDate;
// DAY VARIABLES.............
    let dayNum = newDate.getDay();
    let day = daysName[dayNum];
    let nextDay;
    let thirdDay;
// GET DAY NAME ..........
    if(dayNum == 6){
        nextDay = 0;
    }
    else{
        nextDay = dayNum + 1;
    }


    thirdDay = nextDay + 1;
    current.innerHTML = `${day}`;
    next.innerHTML = `${daysName[nextDay]}`;
    third.innerHTML = `${daysName[thirdDay]}`;
// GET MONTH NAME ...............
    for(var i = 0; i < monthsName.length; i++){
        if(month == i){
            month = monthsName[i];
        }
    }
    fullDate = date + " " + month
    currentDate.innerHTML = `${fullDate}`;
}
