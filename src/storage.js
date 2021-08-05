let storage = (function () {
  let data;

  if (!localStorage.cities) {
    //tests for all falsy values'
    localStorage.cities = `[]`;
    data = [];
  } else {
    data = JSON.parse(localStorage.cities);
  }

  let updateData = function (cityName) {
    data.push(cityName);
    localStorage.cities = JSON.stringify(data);
  };

  let checkForDups = function (cityName) {
    for (let i = 0; i < data.length; i++) {
      if (cityName == data[i]) {
        return true;
      }
    }

    return false;
  };

  let rmvCity = function (cityName) {
    cityName = cityName.toLowerCase();
    for (let i = 0; i < data.length; i++) {
      if (cityName == data[i]) {
        data.splice(i, 1);
      }
    }

    localStorage.cities = JSON.stringify(data);
  };

  return {
    updateData,
    checkForDups,
    rmvCity,
    data,
  };
})();

export { storage };
