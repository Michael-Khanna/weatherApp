import { getWeather } from "./api.js";
import { display } from "./display.js";
import { storage } from "./storage.js";

let searchBar = document.querySelector("#searchBar");

document.addEventListener(`keydown`, function (event) {
  if (event.key == "Enter") {
    if (document.activeElement == searchBar) {
      if (storage.checkForDups(searchBar.value)) {
        return false;
      }

      getWeather(`${searchBar.value}`)
        .then(function (data) {
          display.displayData(data);

          storage.updateData(`${searchBar.value}`);
        })
        .catch(function (error) {
          //catches error from running display.displayData(data), not from getWeather since it still returns an object object
          display.displayError(error);

          throw new Error(error); //executuion of current function stops
        });
    }
  }
});

for (let i = 0; i < storage.data.length; i++) {
  getWeather(`${storage.data[i]}`).then(function (data) {
    display.displayData(data);
  });
}
