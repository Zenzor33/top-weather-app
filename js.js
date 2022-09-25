/*
List of iso countries: https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes#UNI2

Open weather API key points:

key: 22fb22ffdfc6a32c6547a639c2388d0b

API by city name: https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

API by city name and country code: https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

Program functionality
1) The HTML has two hidden h3's that display when the user submits the form field. The first h3 will display data from the API. The second text will vary depending on the temperature of the city.
2) The submit button event listener triggers a function that reads the input value and fetches the weather from openweather API, which returns a promise. 


*/

const theForm = document.getElementById("theForm");
theForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = document.getElementById("city").value;
  const something = getWeather(city);
  const checkbox = document.getElementById("tempF").checked;

  // if (checkbox) switch state to farenheit?
  console.log(something);
});

async function getWeather(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=22fb22ffdfc6a32c6547a639c2388d0b`
  );
  const data = await response.json();
  paintDisplay(data);

  return {
    data,
  };
}

function paintDisplay(data) {
  const headerData = document.getElementById("headerData");
  const headerText = document.getElementById("headerText");
  const cityName = data.name;
  console.log(cityName);
  const country = data.sys.country;
  const temp = data.main.temp;
  const tempC = convertKelvinToCF(temp, "c");
  const tempF = convertKelvinToCF(temp, "f");

  // insert text to headerData
  // ${tempC} in ${city},${country}?!
  headerData.innerHTML = "";
  const textNode1 = document.createTextNode(
    `${tempC}c in ${cityName}, ${country}!?`
  );
  headerData.appendChild(textNode1);

  headerText.innerHTML = "";
  const textNode2 = document.createTextNode(`IT'S FUCKING HOT/COLD/ALRIGHT`);
  headerText.appendChild(textNode2);
}

function convertKelvinToCF(kelvinTemp, measurement) {
  if (measurement === "c" || measurement === "C") {
    return (kelvinTemp - 273.15).toFixed(2);
  } else if (measurement === "f" || measurement === "F") {
    return ((9 / 5) * (kelvinTemp - 273) + 32).toFixed(2);
  } else {
    return console.log("error with temperature conversion");
  }
}
