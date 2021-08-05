import { storage } from "./storage.js";

let display = (function () {
  let body = document.querySelector(`body`);

  let convertTemp = function (div) {
    let tempDiv = div.querySelector(`.tempDiv`);

    let string = tempDiv.textContent;

    let values = string.split(` `);

    let temp = parseFloat(values[0]).toFixed(2);
    let unit = values[1];

    if (unit == `Celsius`) {
      temp = temp * 1.8 + 32;
      unit = `Fahrenheit`;
    } else {
      temp = (temp - 32) / 1.8;
      unit = `Celsius`;
    }

    tempDiv.textContent = `${parseFloat(temp).toFixed(2)} ${unit}`;
  };

  let displayData = function (json) {
    let displayDiv = document.createElement(`div`);
    displayDiv.classList.add(`displayDiv`);

    let nameDiv = document.createElement(`div`);
    nameDiv.classList.add(`nameDiv`);
    nameDiv.textContent = `${json.name}`;

    let tempDiv = document.createElement(`div`);
    tempDiv.classList.add(`tempDiv`);
    tempDiv.textContent = `${parseFloat(json.main.temp - 273.15).toFixed(
      2
    )} Celsius`;

    let forecastDiv = document.createElement(`div`);
    forecastDiv.classList.add(`forecastDiv`);
    forecastDiv.textContent = json.weather[0].main;

    let img = document.createElement(`img`);
    img.classList.add(`forecastIcon`);
    img.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;

    forecastDiv.appendChild(img);

    let convertBtn = document.createElement(`button`);
    convertBtn.classList.add(`convertBtn`);
    convertBtn.textContent = `CONVERT`;

    convertBtn.addEventListener(`click`, function () {
      convertTemp(displayDiv);
    });

    let rmvBtn = document.createElement(`button`);
    rmvBtn.classList.add(`rmvBtn`);
    rmvBtn.textContent = `X`;

    rmvBtn.addEventListener(`click`, function () {
      displayDiv.parentNode.removeChild(displayDiv);
      storage.rmvCity(json.name);
    });

    displayDiv.appendChild(nameDiv);
    displayDiv.appendChild(forecastDiv);
    displayDiv.appendChild(tempDiv);
    displayDiv.appendChild(convertBtn);
    displayDiv.appendChild(rmvBtn);

    body.appendChild(displayDiv);

    if (json.sys.country == "US") {
      convertTemp(displayDiv);
    }
  };

  let displayError = function (error) {
    let errorDiv = document.querySelector(`#errorDiv`);

    errorDiv.textContent = `Location not found. Search must be in the form of "City", "City, State" or "City, Country".`;
    throw new Error(error);
  };

  return {
    displayData,
    displayError,
  };
})();

export { display };
