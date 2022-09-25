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
  getWeather(city);
});

// let state = "";

function setState() {
  let state = "";
  const checkbox = document.getElementById("tempF").checked;
  checkbox ? (state = "imperial") : (state = "metric");
  return state;
}

function changeDeg(units) {
  if (units === "imperial") {
    return "F";
  } else if (units === "metric") {
    return "C";
  }
}

async function getWeather(city) {
  const units = setState();
  const deg = changeDeg(units);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=22fb22ffdfc6a32c6547a639c2388d0b`
  );
  const data = await response.json();
  const a = data.name;
  const b = data.sys.country;
  const c = data.main.temp;
  const d = deg;
  const e = units;
  paintDisplay(a, b, c, d, e);
}

function paintDisplay(city, country, temp, deg, units) {
  const headerData = document.getElementById("headerData");
  const headerText = document.getElementById("headerText");
  const headerTextNode = setHeaderText(temp, units);

  headerData.innerHTML = "";
  const textNode1 = document.createTextNode(
    `${temp}${deg} in ${city}, ${country}!?`
  );
  headerData.appendChild(textNode1);

  headerText.innerHTML = "";
  const textNode2 = document.createTextNode(headerTextNode);
  headerText.appendChild(textNode2);
}

// too lazy to use switch statement
function setHeaderText(temp, units) {
  if (units === "imperial") {
    if (temp < 32) {
      return `IT'S FUCKING FREEZING`;
    } else if (temp < 50) {
      return `IT'S FUCKING COLD`;
    } else if (temp < 65) {
      return `IT'S FUCKING... ALRIGHT`;
    } else if (temp < 80) {
      return `IT'S FUCKING NICE`;
    } else return `IT'S FUCKING HOT'`;
  } else if (units === "metric") {
    if (temp < 0) {
      return `IT'S FUCKING FREEZING`;
    } else if (temp < 10) {
      return `IT'S FUCKING COLD`;
    } else if (temp < 18.5) {
      return `IT'S FUCKING... ALRIGHT`;
    } else if (temp < 26) {
      return `IT'S FUCKING NICE`;
    } else return `IT'S FUCKING HOT'`;
  } else {
    console.log("error setting header text");
  }
}
