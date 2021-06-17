//Update locale time every second
let displayTime = () => {
  let timeDiv = document.getElementById("time");
  let d = new Date().toLocaleTimeString();
  timeDiv.innerHTML = d;
};
setInterval(displayTime, 1000);

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

async function getWeather() {
  const locationDiv = document.getElementById("location");
  const weatherDescDiv = document.getElementById("weatherdesc");

  try {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=26e4c500c1f11ad29591ea65e2d7e11d",
      { mode: "cors" }
    );
    const weatherData = await response.json();
    locationDiv.innerHTML = weatherData.name;
    weatherDescDiv.innerHTML = capitalise(weatherData.weather[0].description);
    console.log(weatherData);
  } catch (err) {
    console.log(err);
  }
}

getWeather();
