//Update locale time every second
let displayTime = () => {
  let timeDiv = document.getElementById("time");
  let d = new Date().toLocaleTimeString();
  timeDiv.innerHTML = d;
};
//setInterval(displayTime, 1000);

//Design features (i.e capitalisation)
let capitalise = (str) => {
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  let capitaliseStr = words.join(" ");
  return capitaliseStr;
};

//API KEY (to be deleted) - 26e4c500c1f11ad29591ea65e2d7e11d
async function getWeather(city) {
  const locationDiv = document.getElementById("location");
  const weatherDescDiv = document.getElementById("weatherdesc");
  const temp = document.getElementById("maintemp");
  const tempImg = document.getElementById("tempimg");
  const feelLike = document.getElementById("feel2");
  const humid = document.getElementById("humid2");
  const pressure = document.getElementById("pressure2");
  const minTemp = document.getElementById("min2");
  const maxTemp = document.getElementById("max2");

  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=26e4c500c1f11ad29591ea65e2d7e11d",
      { mode: "cors" }
    );
    const weatherData = await response.json();

    const iconCode = weatherData.weather[0].icon;
    const weatherIcon =
      "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";

    locationDiv.innerHTML = weatherData.name + ", " + weatherData.sys.country;
    weatherDescDiv.innerHTML = capitalise(weatherData.weather[0].description);
    temp.innerHTML = weatherData.main.temp.toFixed(1) + "°C";
    tempImg.src = weatherIcon;

    feelLike.innerHTML = weatherData.main.feels_like.toFixed(1) + "°C";
    humid.innerHTML = weatherData.main.humidity + "%";
    pressure.innerHTML = weatherData.main.pressure + "mb";
    minTemp.innerHTML = weatherData.main.temp_min.toFixed(1) + "°C";
    maxTemp.innerHTML = weatherData.main.temp_max.toFixed(1) + "°C";
  } catch (err) {
    console.log(err);
  }
}

//Hide and show display
function hide() {
  let searchPage = document.getElementById("startdisplay");
  searchPage.style.display = "none";
}

function show() {
  let resultPage = document.getElementById("searchdisplay");
  resultPage.style.visibility = "visible";
}

//Search bar location input
let search = (() => {
  const form = document.getElementById("form");

  function onSubmit(event) {
    let searchValue = document.forms["form"].location.value;
    form.reset();
    getWeather(searchValue);
    hide();
    show();
    event.preventDefault();
  }

  form.addEventListener("submit", onSubmit);
})();
